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
  startOfDay,
  endOfDay,
  getHours,
  setHours,
  setMinutes,
  addWeeks,
  subWeeks,
  addYears,
  subYears,
  getYear,
  getMonth,
  getDate,
  parseISO,
  getDay,
  addHours
} from 'date-fns';

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

// Component for rendering appointments in day and week views
const AppointmentCard = ({ appointment }) => (
  <div key={appointment.id} className="p-3 rounded-lg bg-[var(--bg-color)] shadow-sm flex items-center space-x-3">
    <img src={appointment.clientImage} alt={appointment.clientName} className="w-10 h-10 rounded-full" />
    <div className="flex-1">
      <h3 className="font-medium">{appointment.clientName}</h3>
      <p className="text-sm text-[var(--text-secondary)]">{appointment.service}</p>
    </div>
    <div className="text-right">
      <div className="font-medium">{appointment.time}</div>
      <div className="text-sm text-[var(--text-secondary)]">{appointment.duration} min</div>
    </div>
  </div>
);

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
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentOption, setCurrentOption] = useState(OPTIONS.APPOINTMENTS);
  const [currentCalendarView, setCurrentCalendarView] = useState(CALENDAR_VIEWS.MONTH);
  const [appointments] = useState(mockAppointments);
  const [schedules] = useState(mockSchedules);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  });

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
        <div>
          <span className="text-lg font-semibold">{headerTitle}</span>
        </div>
        <div className="flex-1 h-full flex flex-row items-center px-2">
          <button 
            className="border h-fit w-fit border-black p-1 rounded-lg font-bold mr-2" 
            onClick={navigateToday}
          >
            Today
          </button>
          {renderToggle(CALENDAR_VIEWS_OPTIONS, "h-[40px]", "w-2/3", currentCalendarView)}
        </div>
        <div>
          <button onClick={navigatePrev} className="text-xl font-bold border w-10 rounded-l">←</button>
          <button onClick={navigateNext} className="text-xl font-bold border w-10 rounded-r">→</button>
        </div>
      </div>
    );
  };

  // Day names header for month view
  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-sm text-[var(--text-primary)] flex-1">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="flex">{days}</div>;
  };

  // Render month view calendar cells
  const renderMonthCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);
        
        // Count appointments for the day
        const appointmentsCount = getAppointmentsForDay(day, appointments).length;

        days.push(
          <div
            key={day}
            onClick={() => onDateClick(cloneDay)}
            className={`flex-1 h-[70px] w-[70px] flex items-center justify-center cursor-pointer
              ${!isCurrentMonth ? 'text-[var(--text-opposite-primary)]' : 'text-[var(--text-primary)]'}
            `}
          >
            <div className={`
              rounded relative
              ${isSelected ? 'bg-[#4f46e770] text-[var(--text-primary)]' : 'hover:bg-[#4f46e51a] hover:text-[var(--primary)]'}
              flex items-center justify-center
              h-[40px] w-[40px]
              `}>
              {appointmentsCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                  {appointmentsCount}
                </div>
              )}
              <span>{format(day, 'd')}</span>
              {appointmentsCount > 0 && isCurrentMonth && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[var(--primary)] rounded-full"></span>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="flex" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  // Render day view with hourly slots
  const renderDayView = () => {
    const hours = [];
    const dayStart = setHours(setMinutes(startOfDay(currentDate), 0), 8); // Start at 8 AM
    const dayAppointments = getAppointmentsForDay(currentDate, appointments);

    for (let i = 0; i < 12; i++) { // Show 12 hours (8 AM to 8 PM)
      const hour = addDays(dayStart, 0);
      const hourFormatted = format(addHours(hour, i), 'h:mm a');
      
      hours.push(
        <div key={i} className="flex border-t border-gray-200">
          <div className="w-20 py-3 text-right pr-3 text-sm text-[var(--text-secondary)]">
            {hourFormatted}
          </div>
          <div className="flex-1 min-h-[60px] hover:bg-[var(--bg-color-hover)]">
            {/* Placeholder for appointments at this hour */}
          </div>
        </div>
      );
    }

    return (
      <div className="mt-4">
        <div className="text-lg font-semibold mb-4">
          {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </div>
        <div className="border rounded-lg overflow-hidden">
          {hours}
        </div>
        <div className="mt-4 space-y-4">
          <h3 className="font-medium">Appointments</h3>
          {dayAppointments.length === 0 ? (
            <div className="text-center py-6 text-[var(--text-secondary)]">
              No appointments for this day
            </div>
          ) : (
            <div className="space-y-4">
              {dayAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render week view with days as columns
  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const days = [];
    const dayNames = [];

    // Create day headers
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      const isToday = isSameDay(day, new Date());
      const isSelected = isSameDay(day, selectedDate);
      
      dayNames.push(
        <div 
          key={i} 
          className={`flex-1 text-center py-2 cursor-pointer
            ${isToday ? 'bg-[var(--primary-light)]' : ''}
            ${isSelected ? 'border-b-2 border-[var(--primary)]' : ''}
          `}
          onClick={() => onDateClick(day)}
        >
          <div className="text-sm font-medium">{format(day, 'EEE')}</div>
          <div className={`text-lg ${isSelected ? 'font-bold' : ''}`}>{format(day, 'd')}</div>
        </div>
      );
    }

    // Create day columns with appointments
    for (let i = 0; i < 7; i++) {
      const day = addDays(weekStart, i);
      const dayAppointments = getAppointmentsForDay(day, appointments);
      
      days.push(
        <div key={i} className="flex-1 min-h-[200px] border-r last:border-r-0">
          {dayAppointments.length > 0 ? (
            <div className="px-1 py-2">
              {dayAppointments.map(appointment => (
                <div 
                  key={appointment.id} 
                  className="mb-2 p-1 bg-[var(--primary-light)] rounded text-xs overflow-hidden"
                >
                  <div className="font-semibold">{appointment.time}</div>
                  <div className="truncate">{appointment.clientName}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-[var(--text-secondary)]">
              No events
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="mt-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="flex border-b">{dayNames}</div>
          <div className="flex h-[300px]">{days}</div>
        </div>
      </div>
    );
  };

  // Render year view with months as grid
  const renderYearView = () => {
    const year = getYear(currentDate);
    const months = [];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(year, month, 1);
      const isCurrentMonthAndYear = month === currentMonth && year === currentYear;
      const isSelectedMonth = month === getMonth(selectedDate) && year === getYear(selectedDate);
      
      months.push(
        <div 
          key={month} 
          className={`
            p-4 rounded-lg cursor-pointer
            ${isCurrentMonthAndYear ? 'bg-[var(--primary-light)]' : 'hover:bg-[var(--bg-color-hover)]'}
            ${isSelectedMonth ? 'border-2 border-[var(--primary)]' : ''}
          `}
          onClick={() => {
            const newDate = new Date(year, month, 1);
            setCurrentDate(newDate);
            setSelectedDate(newDate);
            setCurrentCalendarView(CALENDAR_VIEWS.MONTH);
          }}
        >
          <div className="text-center font-medium">{format(firstDayOfMonth, 'MMMM')}</div>
        </div>
      );
    }

    return (
      <div className="mt-4">
        <div className="text-xl font-semibold mb-4 text-center">{year}</div>
        <div className="grid grid-cols-3 gap-4">
          {months}
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
    <div className='h-full w-full flex flex-row relative'>
      <div className='relative bg-[var(--component-primary)] w-[500px] mr-2 rounded'>
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

      <div className="w-full rounded-md overflow-hidden bg-[var(--component-primary)]">
        {renderHeader()}
        
        {/* Render different calendar views based on selection */}
        {currentCalendarView === CALENDAR_VIEWS.MONTH && (
          <>
            {renderDays()}
            {renderMonthCells()}
          </>
        )}
        
        {currentCalendarView === CALENDAR_VIEWS.DAY && (
          <div className="p-4">
            {renderDayView()}
          </div>
        )}
        
        {currentCalendarView === CALENDAR_VIEWS.WEEK && (
          <div className="p-4">
            {renderWeekView()}
          </div>
        )}
        
        {currentCalendarView === CALENDAR_VIEWS.YEAR && (
          <div className="p-4">
            {renderYearView()}
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