import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from 'date-fns';

const MonthView = ({ currentDate, selectedDate, appointments, onDateClick }) => {
  // Render the weekday headers (Sun, Mon, etc.)
  const renderDayHeaders = () => {
    const startDate = startOfWeek(currentDate);
    return Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="py-2 border-r">
        {format(addDays(startDate, i), 'EEE')}
      </div>
    ));
  };
  

  // Group appointments by date for quick lookup
  const getAppointmentsByDate = () => {
    const map = {};
    appointments.forEach(appt => {
      const key = format(appt.date, 'yyyy-MM-dd');
      if (!map[key]) map[key] = [];
      map[key].push(appt);
    });
    return map;
  };

  // Render each cell in the calendar grid
  const renderMonthCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
  
    const dayToAppointments = getAppointmentsByDate();
  
    let day = startDate;
    const cells = [];
  
    while (day <= endDate) {
      const cloneDay = day;
      const isCurrentMonth = isSameMonth(cloneDay, monthStart);
      const isToday = isSameDay(cloneDay, new Date());
      const isSelected = isSameDay(cloneDay, selectedDate);
      const dayKey = format(cloneDay, 'yyyy-MM-dd');
      const dayAppointments = dayToAppointments[dayKey] || [];
  
      const dayClasses = `
        border-r border-b p-1 text-sm relative cursor-pointer
        ${!isCurrentMonth ? 'text-gray-400 bg-gray-50' : 'text-gray-800 bg-white'}
        ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'}
      `;
  
      const dateClasses = `
        inline-flex items-center justify-center w-6 h-6 rounded-full 
        ${isToday ? 'bg-blue-500 text-white' : ''}
      `;
  
      cells.push(
        <div
          key={cloneDay}
          className={dayClasses}
          onClick={() => onDateClick(cloneDay)}
        >
          <div className={dateClasses}>{format(cloneDay, 'd')}</div>
  
          <div className="mt-2 space-y-1 overflow-hidden">
            {dayAppointments.slice(0, 3).map((appt, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-blue-500 rounded-full mx-auto"
                title={appt.service}
              />
            ))}
            {dayAppointments.length > 3 && (
              <div className="text-[10px] text-center text-gray-500">
                +{dayAppointments.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
  
      day = addDays(day, 1);
    }
  
    return cells;
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Header row (days of week) */}
      <div className="grid grid-cols-7 text-sm font-medium text-center text-gray-600 border-b bg-white">
        {renderDayHeaders()}
      </div>
  
      {/* Calendar grid (rows of days) */}
      <div className="flex-1 grid grid-rows-6 grid-cols-7 border-t border-l">
        {renderMonthCells()}
      </div>
    </div>
  );
};

export default MonthView;
