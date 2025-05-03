// Calendar.js
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


const hexToRGBA = (hex, alpha = 0.1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());


  const renderHeader = () => (
    <div className="flex justify-between items-center p-4 bg-[var(--component-primary)]">
      <div><span className="text-lg font-semibold">{format(currentMonth, 'MMMM')}</span><span className="text-lg font-semibold text-[gray]"> {format(currentMonth, 'yyyy') }</span></div>
      <div>
        <button onClick={prevMonth} className="text-xl font-bold border w-[40px] rounded-l">←</button>
        <button onClick={nextMonth} className="text-xl font-bold border w-[40px] rounded-r">→</button>
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

        days.push(
          <div
            key={day}
            onClick={() => onDateClick(cloneDay)}
            className={`flex-1 h-[70px] w-[70px] flex items-center justify-center cursor-pointer
              ${!isCurrentMonth ? 'text-[var(--text-opposite-primary)]' : 'text-[var(--text-primary)]'}

            `}
          >
            <div className={`
            rounded
              ${isToday ? "bg-red-300" : ""} 
              ${isSelected ? 'bg-[#4f46e51a] text-[var(--primary)]' : 'hover:bg-[#4f46e51a] hover:text-[var(--primary)]'}
              flex items-center justify-center
              h-[40px] w-[40px]
              `}><span>{format(day, 'd')}</span></div>
            
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

  const TAB_OPTIONS = [
    {
      title: "Appointments",
      onClick: () => { }
    },
    {
      title: "Availability",
      onClick: () => { }
    }
  ]

  return (
    <div className='h-full w-full flex flex-row relative'>

      <div className='relative bg-[var(--component-primary)] w-[400px] mr-2 rounded'>
        {/* Section for details */}
        <div>
          {/* Tab title/toggle (Appointments, availability) */}
          <div className='flex flex-row justify-center bg-[#EFEFEF] flex-1 h-[40px] rounded-xl mx-[5px]'>
            {TAB_OPTIONS.map((option, index) => {
              <div className='w-1/2 h-full flex flex-row items-center justify-center'>
                <div className='w-[90%] h-[80%] flex flex-col items-center justify-center bg-[#FFFFFF] rounded-xl shadow-md' key={index}>{ option.title}</div>
            </div>
            })}
            
          </div>
        </div>

        <div>
          {/* Time Picker */}
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
