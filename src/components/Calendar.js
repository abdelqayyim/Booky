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
  isSameDay
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

function Calendar() {
  const OPTIONS = {
    APPOINTMENTS: "Appointments",
    SCHEDULE: "Schedule"
  };
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentOption, setCurrentOption] = useState(OPTIONS.APPOINTMENTS);
  const [appointments] = useState(mockAppointments);
  const [schedules] = useState(mockSchedules);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  });

  const renderHeader = () => (
    <div className="flex justify-between items-center p-4 bg-[var(--component-primary)]">
      <div>
        <span className="text-lg font-semibold">{format(currentMonth, 'MMMM')}</span>
        <span className="text-lg font-semibold text-[gray]"> {format(currentMonth, 'yyyy')}</span>
      </div>
      <div>
        <button onClick={prevMonth} className="text-xl font-bold border w-10 rounded-l">←</button>
        <button onClick={nextMonth} className="text-xl font-bold border w-10 rounded-r">→</button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEE';
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-sm text-[var(--text-primary)] flex-1">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="flex">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
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
        
        // Check if day has appointments
        const hasAppointments = appointments.some(appt => 
          isSameDay(new Date(appt.date), cloneDay)
        );

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
              ${isToday ? "bg-red-300" : ""} 
              ${isSelected ? 'bg-[#4f46e51a] text-[var(--primary)]' : 'hover:bg-[#4f46e51a] hover:text-[var(--primary)]'}
              flex items-center justify-center
              h-[40px] w-[40px]
              `}>
              <span>{format(day, 'd')}</span>
              {hasAppointments && isCurrentMonth && (
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

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const TAB_OPTIONS = Object.values(OPTIONS).map(option => ({
    title: option,
    onClick: () => {
      setCurrentOption(option);
      setIsAddingSchedule(false);
    }
  }));

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

  const todaysAppointments = appointments.filter(appt => 
    isSameDay(new Date(appt.date), selectedDate)
  );

  return (
    <div className='h-full w-full flex flex-row relative'>
      <div className='relative bg-[var(--component-primary)] w-[400px] mr-2 rounded'>
        <div>
          <div className='flex flex-row justify-center bg-[var(--toggle-background)] flex-1 h-[40px] rounded-xl 
          mx-[5px] mt-[10px]'>
            {TAB_OPTIONS.map((option, index) => { 
              return (
                <div className='w-1/2 h-full flex flex-row items-center justify-center 
                                hover:cursor-pointer' key={index} onClick={option.onClick}>
                  <div className={`w-[90%] h-[80%] flex flex-col items-center justify-center
                                  font-semibold ${currentOption == option.title ? 'bg-[var(--toggle-button-background)] shadow-md' : ""} 
                                  rounded-xl`}>{option.title}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-4">
          {currentOption === OPTIONS.APPOINTMENTS && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-4">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h2>
              
              {todaysAppointments.length === 0 ? (
                <div className="text-center py-6 text-[var(--text-secondary)]">
                  No appointments for this day
                </div>
              ) : (
                <div className="space-y-4">
                  {todaysAppointments.map(appointment => (
                    <div key={appointment.id} className="flex items-center p-3 rounded-lg bg-[var(--bg-color)] shadow-sm">
                      <img 
                        src={appointment.clientImage} 
                        alt={appointment.clientName} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{appointment.clientName}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">{appointment.service}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{appointment.time}</p>
                        <p className="text-sm text-[var(--text-secondary)]">{appointment.duration} min</p>
                      </div>
                    </div>
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
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
}

export default Calendar;