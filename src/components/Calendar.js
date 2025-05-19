import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  addWeeks,
  subWeeks,
  addYears,
  subYears,
  getYear,
  getMonth,
} from 'date-fns';
import DayView from './Calendar/DayView';
import WeekView from './Calendar/WeekView';
import AppointmentCard from './AppointmentCard';
import MonthView from './Calendar/MonthView';
import YearView from './Calendar/YearView.js';
import Dropdown from './Dropdown.js';
import Overlay from './Overlay.js';

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientImage: "/api/placeholder/50/50",
    service: "Hair Coloring",
    time: "09:00 AM",
    date: new Date(),
    duration: 90
  },
  {
    id: 2,
    clientName: "Michael Chen",
    clientImage: "/api/placeholder/50/50",
    service: "Men's Haircut",
    time: "11:30 AM",
    date: new Date(),
    duration: 45
  },
  {
    id: 3,
    clientName: "Jessica Williams",
    clientImage: "/api/placeholder/50/50",
    service: "Manicure & Pedicure",
    time: "02:15 PM",
    date: new Date(),
    duration: 75
  }
];

// Mock data for schedules
const mockSchedules = [
  {
    id: 1,
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  },
  {
    id: 2,
    day: "Tuesday",
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  },
  {
    id: 3,
    day: "Wednesday",
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  },
  {
    id: 4,
    day: "Thursday",
    startTime: "09:00 AM",
    endTime: "07:00 PM"
  },
  {
    id: 5,
    day: "Friday",
    startTime: "09:00 AM",
    endTime: "07:00 PM"
  },
  {
    id: 6,
    day: "Saturday",
    startTime: "10:00 AM",
    endTime: "03:00 PM"
  }
];


// Helper function to get appointments for a specific day
const getAppointmentsForDay = (day, appointments) => {
  return appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return isSameDay(appointmentDate, day);
  });
};

function Calendar() {
  const OPTIONS = {
    APPOINTMENTS: "Appointments",
    SCHEDULE: "Schedule"
  };
  
  const CALENDAR_VIEWS = {
    DAY: "Day",
    WEEK: "Week",
    MONTH: "Month",
    YEAR: "Year",
    SCHEDULE: "Schedule"
  };

  const VIEWS = [
    { label: 'DAY', onClick: () => setCurrentCalendarView(CALENDAR_VIEWS.DAY)  },
    { label: 'WEEK', onClick: () => setCurrentCalendarView(CALENDAR_VIEWS.WEEK)  },
    { label: 'MONTH', onClick: () => setCurrentCalendarView(CALENDAR_VIEWS.MONTH)  },
    { label: 'YEAR', onClick: () => setCurrentCalendarView(CALENDAR_VIEWS.YEAR) },
    { label: 'SCHEDULE', onClick: () => setCurrentCalendarView(CALENDAR_VIEWS.SCHEDULE)  }
  ]
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentOption, setCurrentOption] = useState(OPTIONS.APPOINTMENTS);
  const [currentCalendarView, setCurrentCalendarView] = useState(CALENDAR_VIEWS.DAY);
  const [appointments] = useState(mockAppointments);
  const [schedules] = useState(mockSchedules);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  });
  const [openCalendarViewOptions, setOpenCalendarViewOptions] = useState(false);

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
        setCurrentDate(addMonths(currentDate, 1));
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
        setCurrentDate(subMonths(currentDate, 0, 1));
        setSelectedDate(subMonths(currentDate, 0, 1));
        break;
      case CALENDAR_VIEWS.WEEK:
        setCurrentDate(subWeeks(currentDate, 1));
        setSelectedDate(subWeeks(currentDate, 1));
        break;
      case CALENDAR_VIEWS.MONTH:
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case CALENDAR_VIEWS.YEAR:
        setCurrentDate(subYears(currentDate, 1));
        break;
      default:
        break;
    }
  };

  const navigateToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Header component with navigation controls
  const renderHeader = () => {
    let headerTitle = "";
    
    switch (currentCalendarView) {
      case CALENDAR_VIEWS.DAY:
        headerTitle = format(currentDate, 'EEEE, MMMM d, yyyy');
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

    return (
      <div className="flex justify-between items-center p-4 bg-[var(--component-primary)]">
        <div className='flex flex-row '>
          <button className="border h-fit w-fit border-black p-1 rounded-2xl font-bold mr-2" onClick={navigateToday}>Today</button>
          <div className='mr-2'>
            <button onClick={navigatePrev} className="text-xl font-bold border w-10 rounded-l">←</button>
            <button onClick={navigateNext} className="text-xl font-bold border w-10 rounded-r">→</button>
          </div>
        </div>
        
        <div><span className="text-lg font-semibold">{headerTitle}</span></div>

        <Dropdown
          items={VIEWS}
          trigger={<div className='hover:cursor-pointer border p-1 rounded-2xl border-black'>{currentCalendarView}</div>}
          isOpen={openCalendarViewOptions} setIsOpen={setOpenCalendarViewOptions}
        />
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

  const CALENDAR_VIEWS_OPTIONS = Object.values(CALENDAR_VIEWS).map(option => ({
    title: option,
    onClick: () => {
      setCurrentCalendarView(option);
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
    console.log("New schedule:", newSchedule);
    setIsAddingSchedule(false);
  };

  // Get appointments for the selected date
  const selectedDateAppointments = getAppointmentsForDay(selectedDate, appointments);

  return (
    <div className='h-full w-full flex flex-row relative bg-red-200'>
      <div className='relative bg-[var(--component-primary)] w-[500px] mr-2 rounded-md'>
        <div className='mt-[10px]'>
          {renderToggle(TAB_OPTIONS, "h-[40px]", "", currentOption)}
        </div>

        <div className="p-4">
          {currentOption === OPTIONS.APPOINTMENTS && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-4">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h2>
              
              {selectedDateAppointments.length === 0 ? (
                <div className="text-center py-6 text-[var(--text-secondary)]">
                  No appointments for this day
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateAppointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              )}
            </div>
          )}

          {currentOption === OPTIONS.SCHEDULE && !isAddingSchedule && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Schedule</h2>
                <button 
                  onClick={handleAddSchedule}
                  className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-3 py-1 rounded-md text-sm"
                >
                  Add New
                </button>
              </div>
              
              <div className="space-y-2">
                {schedules.map(schedule => (
                  <div key={schedule.id} className="flex justify-between items-center p-3 rounded-lg bg-[var(--bg-color)] shadow-sm">
                    <div className="font-medium">{schedule.day}</div>
                    <div className="text-[var(--text-secondary)]">
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                  </div>
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
        
        {/* Render different calendar views based on selection */}
        {currentCalendarView === CALENDAR_VIEWS.MONTH && (
          <MonthView currentDate={new Date()} selectedDate={selectedDate} appointments={appointments} onDateClick={ onDateClick} />
        )}
        
        {currentCalendarView === CALENDAR_VIEWS.DAY && (
          <div className="p-4">
            {/* {renderDayView()} */}
            <DayView currentDate={currentDate} appointments={appointments}/>
          </div>
        )}
        
        {currentCalendarView === CALENDAR_VIEWS.WEEK && (
          <div className="p-4">
            <WeekView
              currentDate={new Date()}
              appointments={appointments}
              selectedDate={new Date()}
              onDateClick={(day) => setSelectedDate(day)}
            />
          </div>
        )}
        
        {currentCalendarView === CALENDAR_VIEWS.YEAR && (
          <div className="p-4">
            <YearView
              currentDate={new Date()}
              setCurrentDate={setCurrentDate}
              setSelectedDate={setSelectedDate}
              CALENDAR_VIEWS={CALENDAR_VIEWS}
              setCurrentCalendarView={setCurrentCalendarView}
            />
          </div>
        )}
        
        {currentCalendarView === CALENDAR_VIEWS.SCHEDULE && (
          <div className="p-4">
            {renderScheduleView()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;