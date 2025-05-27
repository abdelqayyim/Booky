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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthView = ({ currentDate,setCurrentDate, selectedDate, appointments, onDateClick }) => {
  const currentMonth = currentDate.getMonth();

  const renderMonthSelector = () => {
    return (
      <div className="flex justify-center items-center gap-2 p-2 bg-[var(--component-primary)] rounded-t-xl">
        {MONTHS.map((month, idx) => (
          <button
            key={month}
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(idx);
              setCurrentDate(newDate);
            }}
            className={`
              px-3 py-3 text-sm rounded-md font-medium shadow-sm
              ${currentMonth === idx
                ? "bg-[var(--toggle-button-background)] text-[var(--secondary)]"
                : "bg-[var(--toggle-background)] text-[var(--secondary)] hover:bg-[var(--toggle-button-background)]"}
            `}
          >
            {month}
          </button>
        ))}
      </div>
    );
  }

  // Render the weekday headers (Sun, Mon, etc.)
  const renderDayHeaders = () => {
    const startDate = startOfWeek(currentDate);
    return Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="py-2 text-[var(--secondary)]">
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
      const dayKey = format(cloneDay, 'yyyy-MM-dd');
      const dayAppointments = dayToAppointments[dayKey] || [];
  
      const dayClasses = `
        border-r border-b border-[var(--bg-color)] p-1 text-sm relative
        bg-[var(--component-primary)]
        ${!isCurrentMonth ? 'text-gray-400 ' : 'text-gray-800'}
      `;
  
      const dateClasses = `
        inline-flex items-center justify-center w-6 h-6 rounded-full text-[var(--secondary)]
        ${isToday ? 'bg-blue-500 text-[var(--secondary)]' : ''}
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
                className="w-full pl-[4px] mx-auto text-[10px] flex flex-row items-center gap-1 text-[var(--secondary)]
                 hover:cursor-pointer hover:bg-[var(--bg-color-secondary)] rounded"
              >
                <div className='h-2 w-2 bg-blue-500 rounded-full'></div>
                {appt.clientName}
              </div>
            ))
            }
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
    <div className="h-full flex flex-col hide-scrollbar">
      {/* Header row (days of week) */}
      {renderMonthSelector()}
      <div className="grid grid-cols-7 text-sm font-medium text-center 
      text-gray-600  border-[var(--bg-color-secondary)] bg-[var(--component-primary)]">
        {renderDayHeaders()}
      </div>
  
      {/* Calendar grid (rows of days) */}
      <div className="flex-1 grid grid-rows-6 grid-cols-7 border-t border-[var(--bg-color-secondary)]">
        {renderMonthCells()}
      </div>
    </div>
  );
};

export default MonthView;
