import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addWeeks,
  subWeeks,
  addYears,
  subYears,
  subDays,
  isWithinInterval
} from 'date-fns';
import DayView from './Calendar/DayView';
import WeekView from './Calendar/WeekView';
import AppointmentCard from './AppointmentCard';
import MonthView from './Calendar/MonthView';
import YearView from './Calendar/YearView.js';
import Dropdown from './Dropdown.js';
import OverrideSchedule from './Calendar/OverrideSchedule.js';
import { ARROW_UP, ARROW_DOWN, EDIT_BUTTON, ADD_BUTTON } from '../pages/constants.js';
import Tooltip from "@mui/material/Tooltip";
import CustomButton from './CustomButton.js';
import { FORMS } from '../components/Forms/FormsContainer.js'
import { setCurrentForm } from '../redux/ui/uiSlice.js';

// // Mock data for appointments
// const mockAppointments = [
//   {
//     id: 1,
//     clientName: "Sarah Johnson",
//     clientImage: "/api/placeholder/50/50",
//     service: "Hair Coloring",
//     time: "09:00 AM",
//     date: new Date(),
//     duration: 90,
//     phone: "(555) 123-4567",
//     email: "sarah.johnson@email.com",
//     location: "Downtown Salon - Chair 3",
//     price: 150,
//     notes: "Client prefers natural blonde highlights. Allergic to ammonia-based products.",
//     status: "confirmed"
//   },
//   {
//     id: 2,
//     clientName: "Michael Chen",
//     clientImage: "/api/placeholder/50/50",
//     service: "Men's Haircut",
//     time: "11:30 AM",
//     date: new Date(),
//     duration: 45,
//     phone: "(555) 987-6543",
//     email: "m.chen@email.com",
//     location: "Main Floor - Station 2",
//     price: 35,
//     notes: "Regular client - usual fade cut with trim on top.",
//     status: "confirmed"
//   },
//   {
//     id: 3,
//     clientName: "Jessica Williams",
//     clientImage: "/api/placeholder/50/50",
//     service: "Manicure & Pedicure",
//     time: "02:15 PM",
//     date: new Date(),
//     duration: 75,
//     phone: "(555) 456-7890",
//     email: "jessica.w@email.com",
//     location: "Nail Studio - Table 1",
//     price: 65,
//     notes: "Requested gel polish in coral pink. Has sensitive skin.",
//     status: "confirmed"
//   },
//   {
//     id: 4,
//     clientName: "Michael Chen",
//     clientImage: "/api/placeholder/50/50",
//     service: "Men's Haircut",
//     time: "05:30 PM",
//     date: new Date(),
//     duration: 45,
//     phone: "(555) 987-6543",
//     email: "m.chen@email.com",
//     location: "Main Floor - Station 2",
//     price: 35,
//     notes: "Follow-up appointment for touch-up.",
//     status: "confirmed"
//   },
//   {
//     id: 5,
//     clientName: "Emily Davis",
//     clientImage: "/api/placeholder/50/50",
//     service: "Facial Treatment",
//     time: "10:00 AM",
//     date: addDays(new Date(), 1),
//     duration: 60,
//     phone: "(555) 321-0987",
//     email: "emily.davis@email.com",
//     location: "Spa Room A",
//     price: 90,
//     notes: "First-time client. Oily skin type, looking for deep cleansing treatment.",
//     status: "pending"
//   },
//   {
//     id: 6,
//     clientName: "John Smith",
//     clientImage: "/api/placeholder/50/50",
//     service: "Beard Trim",
//     time: "04:00 PM",
//     date: addDays(new Date(), 1),
//     duration: 30,
//     phone: "(555) 654-3210",
//     email: "john.smith@email.com",
//     location: "Barber Station",
//     price: 25,
//     notes: "Prefers classic professional look. Regular maintenance trim.",
//     status: "confirmed"
//   }
// ];

// // Mock data for schedules
// const mockSchedules = [
//   {
//     id: 1,
//     day: "Monday",
//     startTime: "09:00 AM",
//     endTime: "05:00 PM"
//   },
//   {
//     id: 2,
//     day: "Tuesday",
//     startTime: "09:00 AM",
//     endTime: "05:00 PM"
//   },
//   {
//     id: 3,
//     day: "Wednesday",
//     startTime: "09:00 AM",
//     endTime: "05:00 PM"
//   },
//   {
//     id: 4,
//     day: "Thursday",
//     startTime: "09:00 AM",
//     endTime: "07:00 PM"
//   },
//   {
//     id: 5,
//     day: "Friday",
//     startTime: "09:00 AM",
//     endTime: "07:00 PM"
//   },
//   {
//     id: 6,
//     day: "Saturday",
//     startTime: "10:00 AM",
//     endTime: "03:00 PM"
//   }
// ];

// const mockDefaultSchedules = {
//   userId: "user_001",
//   weekStartDate: null, // null = default
//   days: {
//     Monday: [
//       { startTime: "08:00", endTime: "10:00" },
//       { startTime: "14:00", endTime: "17:00" },
//     ],
//     Tuesday: [{ startTime: "09:00", endTime: "17:00" }],
//     Wednesday: [{ startTime: "09:00", endTime: "17:00" }],
//     Thursday: [{ startTime: "10:00", endTime: "18:00" }],
//     Friday: [{ startTime: "09:00", endTime: "15:00" }],
//     Saturday: [],
//     Sunday: [],
//   },
// }
// const mockOverrideSchedules = [
//   {
//     userId: "user_001",
//     weekStartDate: "2025-06-08", // Sunday
//     days: {
//       Monday: [
//         { startTime: "10:00", endTime: "12:00" }, // shortened
//         { startTime: "13:00", endTime: "14:00" },
//       ],
//       Tuesday: [], // no availability (override default)
//       Wednesday: [{ startTime: "10:00", endTime: "16:00" }],
//       // Thursday to Sunday inherit default
//     },
//   },
// ];
function Calendar() {
  const OPTIONS = {
    BOOKINGS: "Bookings",
    // Bookings: "Bookings",
    SCHEDULE: "Schedule"
  };
  
  const CALENDAR_VIEWS = {
    DAY: "Day",
    WEEK: "Week",
    MONTH: "Month",
    YEAR: "Year",
    SCHEDULE: "Schedule"
  };
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentOption, setCurrentOption] = useState(OPTIONS.BOOKINGS);
  const [currentCalendarView, setCurrentCalendarView] = useState(CALENDAR_VIEWS.DAY);

  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  });
  const [openCalendarViewOptions, setOpenCalendarViewOptions] = useState(false);
  const [isDefaultOpen, setIsDefaultOpen] = useState(true);
  const [openOverrides, setOpenOverrides] = useState({}); // key: weekStartDate, value: boolean

  const appointments = useSelector((state) => state.user.appointments);
  const schedules = useSelector((state) => ({default: state.user.defaultSchedule, overrideSchedule: state.user.overrideSchedule}));

  const allViews = [
    { label: 'DAY', value: CALENDAR_VIEWS.DAY },
    { label: 'WEEK', value: CALENDAR_VIEWS.WEEK },
    { label: 'MONTH', value: CALENDAR_VIEWS.MONTH },
    { label: 'YEAR', value: CALENDAR_VIEWS.YEAR },
    { label: 'SCHEDULE', value: CALENDAR_VIEWS.SCHEDULE }
  ];

  const VIEWS = allViews
  .filter(view => view.value !== currentCalendarView)
  .map(view => ({
    label: view.label,
    onClick: () => setCurrentCalendarView(view.value)
  }));

  const handleCreateEvent = () => {
    dispatch(setCurrentForm(FORMS.CREATE_EVENT))
  }

  // Toggle component for switching between options
  const renderToggle = (options, height, width, currentValue) => (
    <div className={`${height} ${width} flex flex-row justify-center bg-[var(--toggle-background)] flex-1 rounded-xl 
          mx-[5px]`}>
      {options.map((option, index) => (
        <div className='w-1/2 h-full flex flex-row items-center justify-center 
                      hover:cursor-pointer' key={index} onClick={option.onClick}>
          <div className={`w-[90%] h-[80%] flex flex-col items-center justify-center
                          font-semibold ${currentValue === option.title ? 'bg-[var(--toggle-button-background)] shadow-md' : ""} 
                          rounded-xl`}>{option.title}</div>
        </div>
      ))}
    </div>
  );

  // Navigation functions
  const navigateNext = () => {
    switch (currentCalendarView) {
      case CALENDAR_VIEWS.DAY:
        setCurrentDate(addDays(currentDate, 1));
        setSelectedDate(addDays(currentDate, 1));
        break;
      case CALENDAR_VIEWS.WEEK:
        setCurrentDate(addWeeks(currentDate, 1));
        setSelectedDate(addWeeks(currentDate, 1));
        break;
      case CALENDAR_VIEWS.MONTH:
        setCurrentDate(addYears(currentDate, 1));
        break;
      case CALENDAR_VIEWS.YEAR:
        setCurrentDate(addYears(currentDate, 1));
        break;
      default:
        break;
    }
  };

  const navigatePrev = () => {
    switch (currentCalendarView) {
      case CALENDAR_VIEWS.DAY:
        const prevDay = subDays(currentDate, 1);
        setCurrentDate(prevDay);
        setSelectedDate(prevDay);
        break;
      case CALENDAR_VIEWS.WEEK:
        const prevWeek = subWeeks(currentDate, 1);
        setCurrentDate(prevWeek);
        setSelectedDate(prevWeek);
        break;
      case CALENDAR_VIEWS.MONTH:
        setCurrentDate(subYears(currentDate, 1));
        break;
      case CALENDAR_VIEWS.YEAR:
        setCurrentDate(subYears(currentDate, 1));
        break;
      default:
        break;
    }
  };

  const handleEditSchedule = (weekStartDate) => {
    if (weekStartDate === null) {
      // Editing the default schedule
      console.log("Edit default schedule");
    } else {
      console.log("Edit override schedule for week:", weekStartDate);
    }
  
    // Set state to open edit modal/form
  };
  const toggleOverride = (weekStartDate) => {
    setOpenOverrides(prev => ({
      ...prev,
      [weekStartDate]: !prev[weekStartDate],
    }));
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };
  const renderHeaderTitle = () => {
    let headerTitle = "";
    switch (currentCalendarView) {
      case CALENDAR_VIEWS.DAY:
        // headerTitle = format(currentDate, 'EEEE, MMMM d, yyyy');
        break;
      case CALENDAR_VIEWS.WEEK:
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        headerTitle = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
        break;
      case CALENDAR_VIEWS.MONTH:
        headerTitle = `${format(currentDate, 'MMMM yyyy')}`;
        break;
      case CALENDAR_VIEWS.YEAR:
        headerTitle = format(currentDate, 'yyyy');
        break;
      default:
        headerTitle = format(currentDate, 'MMMM yyyy');
    }
    return headerTitle;
  }

  // Header component with navigation controls
  const renderHeader = () => {
    let headerTitle = renderHeaderTitle();

    return (
      <div className="flex justify-between items-center p-4 bg-[var(--component-primary)]">
        <div className='flex flex-row '>
          <div onClick={navigateToday} className={`p-1 flex flex-row justify-center bg-[var(--toggle-background)] flex-1 rounded-xl 
              mx-[5px]`}><div className={`w-fit h-fit px-2 py-1 flex flex-col items-center justify-center font-semibold bg-[var(--toggle-button-background)] shadow-md rounded-xl cursor-pointer`}>Today</div>
          </div>

          <div className={`p-1 flex flex-row justify-center bg-[var(--toggle-background)] rounded-xl mx-[5px]`}>
            <button onClick={navigatePrev} className="text-xl font-bold  border-none w-10 bg-[var(--toggle-button-background)] shadow-md rounded-xl mr-1">←</button>
            <button onClick={navigateNext} className="text-xl font-bold border-none w-10 bg-[var(--toggle-button-background)] shadow-md rounded-xl">→</button>
          </div>

        </div>
        
        <div><span className="text-lg font-semibold">{headerTitle}</span></div>

        <div className='flex flex-row items-center justify-center'>
          <CustomButton
            icon={ADD_BUTTON}
            onClick={handleCreateEvent}
            tooltipTitle="Add"
            tooltipPlacement="bottom"
            colorScheme="primary"
            height="35px"
            width="45px"
          />

          <Dropdown
            itemClassName={`bg-[var(--toggle-background)] hover:bg-[var(--bg-color-secondary)]`}
            items={VIEWS}
            trigger={
              <div className={`cursor-pointer p-1 flex flex-row justify-center bg-[var(--toggle-background)] flex-1 rounded-xl 
                mx-[5px]`}><div className={`w-fit h-fit px-2 py-1 flex flex-col items-center justify-center font-semibold bg-[var(--toggle-button-background)] shadow-md rounded-xl`}>{currentCalendarView}</div>
              </div>
            }
            isOpen={openCalendarViewOptions} setIsOpen={setOpenCalendarViewOptions}
          />
        </div>
      </div>
    );
  };

  // Render schedule view
  const renderScheduleView = () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    return (
      <div className="mt-4">
        <div className="text-lg font-semibold mb-4">Weekly Schedule</div>
        <div className="space-y-2">
          {daysOfWeek.map(day => {
            const daySchedule = schedules.find(s => s.day === day);
            
            return (
              <div key={day} className="flex items-center p-3 rounded-lg bg-[var(--bg-color)] shadow-sm">
                <div className="w-24 font-medium">{day}</div>
                {daySchedule ? (
                  <div className="flex-1 flex justify-between items-center">
                    <div className="text-[var(--text-secondary)]">
                      {daySchedule.startTime} - {daySchedule.endTime}
                    </div>
                    <div className="text-sm bg-[var(--primary)] text-white px-2 py-1 rounded">
                      {daySchedule.startTime === "Closed" ? "Closed" : "Open"}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 text-[var(--text-secondary)]">Closed</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const filterAppointmentsByView = (view, currentDate, appointments) => {
    switch (view) {
      case CALENDAR_VIEWS.DAY:
        return appointments.filter(appt =>
          isSameDay(new Date(appt.date), currentDate)
        );
      case CALENDAR_VIEWS.WEEK:
        return appointments.filter(appt =>
          isWithinInterval(new Date(appt.date), {
            start: startOfWeek(currentDate, { weekStartsOn: 0 }),
            end: endOfWeek(currentDate, { weekStartsOn: 0 }),
          })
        );
      case CALENDAR_VIEWS.MONTH:
        return appointments.filter(appt =>
          isSameMonth(new Date(appt.date), currentDate)
        );
      default:
        return appointments;
    }
  };
  
  const filteredAppointments = useMemo(
    () => filterAppointmentsByView(currentCalendarView, currentDate, appointments),
    [currentCalendarView, currentDate, appointments]
  );

  // Render Calendar View
  const renderCalendarView = () => {
    switch (currentCalendarView) {
      case CALENDAR_VIEWS.MONTH:
        return (
          <MonthView
            currentDate={currentDate}
            selectedDate={selectedDate}
            appointments={filteredAppointments}
            onDateClick={onDateClick}
            setCurrentDate={setCurrentDate}
          />
          
        );
      case CALENDAR_VIEWS.DAY:
        return (
          <div className="px-4 overflow-y-scroll hide-scrollbar h-full">
            <DayView currentDate={currentDate} setCurrentDate={setCurrentDate} appointments={filteredAppointments} />
          </div>
        );
      case CALENDAR_VIEWS.WEEK:
        return (
          <div className="p-4 overflow-y-scroll hide-scrollbar h-full">
            <WeekView
              currentDate={currentDate}
              appointments={filteredAppointments}
              selectedDate={currentDate}
              onDateClick={(day) => setSelectedDate(day)}
            />
          </div>
        );
      case CALENDAR_VIEWS.YEAR:
        return (
          <div className="p-4 overflow-y-scroll hide-scrollbar h-full">
            <YearView
              currentDate={new Date()}
              setCurrentDate={setCurrentDate}
              setSelectedDate={setSelectedDate}
              CALENDAR_VIEWS={CALENDAR_VIEWS}
              setCurrentCalendarView={setCurrentCalendarView}
            />
          </div>
        );
      case CALENDAR_VIEWS.SCHEDULE:
        return <div className="p-4">{renderScheduleView()}</div>;
      default:
        return null;
    }
  };
  
  // Handler for date clicks
  const onDateClick = (day) => {
    setSelectedDate(day);
    if (currentCalendarView === CALENDAR_VIEWS.MONTH) {
      // If significant difference in month, update current date too
      if (!isSameMonth(day, currentDate)) {
        setCurrentDate(day);
      }
    }
  };

  // Option toggles
  const TAB_OPTIONS = Object.values(OPTIONS).map(option => ({
    title: option,
    onClick: () => {
      setCurrentOption(option);
      setIsAddingSchedule(false);
    }
  }));

  // Schedule management handlers
  const handleAddSchedule = () => {
    setIsAddingSchedule(true);
  };


  const handleScheduleChange = (field, value) => {
    setNewSchedule(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSchedule = () => {
    // In a real app, you would save this to your backend
    setIsAddingSchedule(false);
  };

  return (
    <div className='h-full w-full flex flex-row relative'>
      <div className='relative bg-[var(--component-primary)] w-[500px] mr-2 rounded-md overflow-y-scroll hide-scrollbar'>
        <div className='sticky top-0 z-10 bg-[var(--component-primary)] pt-[10px]'>
          {renderToggle(TAB_OPTIONS, "h-[40px]", "", currentOption)}
        </div>

        <div className="p-4">
          {currentOption === OPTIONS.BOOKINGS && (
            <div className="">
              <h2 className="flex flex-row justify-center sticky top-[50px] z-10 bg-[var(--component-primary)] text-lg font-semibold mb-4 px-4 pt-2 pb-2">
                {renderHeaderTitle()}
              </h2>
              
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-6 text-[var(--text-secondary)]">
                  No appointments for this {currentCalendarView}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} bgColor={"bg-[var(--bg-color)]"}/>
                  ))}
                </div>
              )}
            </div>
          )}

        {currentOption === OPTIONS.SCHEDULE && !isAddingSchedule && (
          <div className="mt-4">
            {/* Default Schedule Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Default Schedule</h2>
              <div className="flex gap-2">
                  <Tooltip title={isDefaultOpen ? "Close" : "Expand"} placement="bottom">
                  <button
                  onClick={() => setIsDefaultOpen(!isDefaultOpen)}
                  className="text-sm px-2 py-1 rounded-md bg-[var(--toggle-background)] hover:bg-gray-200 text-[var(--text-primary)]"
                  >
                    <div>{isDefaultOpen ? ARROW_UP : ARROW_DOWN}</div>
                </button>
                </Tooltip>
                  <Tooltip title='Edit' placement="bottom">
                  <button
                  onClick={() => handleEditSchedule(null)}
                  className="bg-[var(--toggle-background)] text-sm text-[var(--text-primary)] px-3 py-1 rounded-md"
                >
                  {EDIT_BUTTON}
                </button>
                  </Tooltip>
                  <Tooltip title='Add' placement="bottom">
                  <button 
                  onClick={handleAddSchedule}
                  className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-3 py-1 rounded-md text-sm"
                >
                  {ADD_BUTTON}
                </button>
                  </Tooltip>
                
              </div>
            </div>

            {/* Default Schedule Display */}
            {isDefaultOpen && (
              <div className="space-y-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
                  const blocks = schedules.default.days[day] || [];
                  return (
                    <div key={day} className="p-3 rounded-lg bg-[var(--bg-color)] shadow-sm">
                      <div className="font-medium mb-1">{day}</div>
                      {blocks.length > 0 ? (
                        <div className="space-y-1">
                          {blocks.map((block, idx) => (
                            <div key={idx} className="text-sm text-[var(--text-secondary)]">
                              {block.startTime} - {block.endTime}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-[var(--text-secondary)] italic">No hours</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Override Schedules */}
              <div>
                <div className='my-2 font-bold'>You Overrides</div>
              {schedules.overrideSchedule.map((override, i) => (
                <OverrideSchedule
                  key={override.weekStartDate}
                  weekStartDate={override.weekStartDate}
                  days={override.days}
                />
              ))}
            </div>
          </div>
        )}

          {currentOption === OPTIONS.SCHEDULE && isAddingSchedule && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-4">Add New Schedule</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Day</label>
                  <select 
                    value={newSchedule.day}
                    onChange={(e) => handleScheduleChange('day', e.target.value)}
                    className="w-full p-2 border rounded-md bg-[var(--bg-color)]"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <select
                    value={newSchedule.startTime}
                    onChange={(e) => handleScheduleChange('startTime', e.target.value)}
                    className="w-full p-2 border rounded-md bg-[var(--bg-color)]"
                  >
                    {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <select
                    value={newSchedule.endTime}
                    onChange={(e) => handleScheduleChange('endTime', e.target.value)}
                    className="w-full p-2 border rounded-md bg-[var(--bg-color)]"
                  >
                    {['03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <button 
                    onClick={() => setIsAddingSchedule(false)}
                    className="px-4 py-2 border rounded-md text-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveSchedule}
                    className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-4 py-2 rounded-md text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col h-full w-full rounded-md overflow-hidden bg-[var(--component-primary)]">
        {renderHeader()}
        {renderCalendarView()}
      </div>
    </div>
  );
}

export default Calendar;
