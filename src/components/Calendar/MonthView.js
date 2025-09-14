import React, { useRef, useLayoutEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentDate } from "../../redux/ui/uiSlice";
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
import { CALENDAR_VIEWS, filterAppointmentsByView } from '../../redux/user/userSlice';

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MonthView = () => {
  const dispatch = useDispatch();
  const currentDateString = useSelector((state) => state.ui.currentDate);
  const currentDate = useMemo(() => new Date(currentDateString), [currentDateString]);
  const currentMonth = currentDate.getMonth();
  const [visibleCounts, setVisibleCounts] = useState({});
  const cellRefs = useRef({});

  const apts = useSelector((state) => state.user.appointments);
    const appointments = useMemo(
      () => filterAppointmentsByView(CALENDAR_VIEWS.MONTH, currentDate, apts),
      [currentDate, apts]
    );

  useLayoutEffect(() => {
    const newCounts = {};
    for (const key in cellRefs.current) {
      const el = cellRefs.current[key];
      if (el) {
        const availableHeight = el.clientHeight - 32; // Adjusted: 24px for date + 8px buffer
        const approxRowHeight = 24; // Estimated height per row
        newCounts[key] = Math.max(0, Math.floor(availableHeight / approxRowHeight));
      }
    }
    setVisibleCounts(newCounts);
  }, [currentDate, appointments]);


  // Handler for date clicks
    const onDateClick = (day) => {
      // setSelectedDate(day);
      if (!isSameMonth(day, currentDate)) {
          dispatch(setCurrentDate(day.toISOString()));
        }
    };
  

  const renderMonthSelector = () => (
    <div className="flex justify-center items-center gap-2 p-2 bg-[var(--component-primary)] rounded-t-xl">
      {MONTHS.map((month, idx) => (
        <button
          key={month}
          onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setMonth(idx);
            dispatch(setCurrentDate(newDate.toISOString()));
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

  const renderDayHeaders = () => {
    const startDate = startOfWeek(currentDate);
    return Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="py-2 text-[var(--secondary)] text-center text-sm font-medium">
        {format(addDays(startDate, i), 'EEE')}
      </div>
    ));
  };

  const getAppointmentsByDate = () => {
    const map = {};
    appointments.forEach(appt => {
      const key = format(appt.date, 'yyyy-MM-dd');
      if (!map[key]) map[key] = [];
      map[key].push(appt);
    });
    return map;
  };

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
      const visibleLimit = visibleCounts[dayKey] || 0;

      const dayClasses = `
        border-r border-b border-[var(--bg-color)] p-1 text-sm relative
        bg-[var(--component-primary)]
        ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-800'}
      `;

      const dateClasses = `
        inline-flex items-center justify-center w-6 h-6 rounded-full text-[var(--secondary)] align-center
        ${isToday ? 'bg-blue-500 text-white' : ''}
      `;

      cells.push(
        <div
          key={dayKey}
          ref={(el) => (cellRefs.current[dayKey] = el)}
          className={dayClasses}
          onClick={() => onDateClick(cloneDay)}
        >
          <div className='w-full flex flex-row items-center justify-center'><div className={dateClasses}>{format(cloneDay, 'd')}</div></div>

          <div className="mt-2 space-y-1 overflow-hidden">
            {dayAppointments.slice(0, visibleLimit).map((appt, index) => (
              <div
                key={index}
                className="w-full pl-[4px] text-[10px] flex items-center gap-1 text-[var(--secondary)] hover:cursor-pointer hover:bg-[var(--bg-color-secondary)] rounded"
              >
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                {appt.clientName}
              </div>
            ))}
            {dayAppointments.length > visibleLimit && (
              <div className="text-[10px] text-center text-gray-500">
                +{dayAppointments.length - visibleLimit} more
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
      {renderMonthSelector()}

      <div className="grid grid-cols-7 text-sm font-medium text-center text-gray-600 border-[var(--bg-color-secondary)] bg-[var(--component-primary)]">
        {renderDayHeaders()}
      </div>

      <div className="flex-1 overflow-auto grid grid-rows-6 grid-cols-7 border-t border-[var(--bg-color-secondary)]">
        {renderMonthCells()}
      </div>
    </div>
  );
};

export default MonthView;
