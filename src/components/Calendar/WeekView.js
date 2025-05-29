import React, { useEffect, useRef, useState } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  isThisWeek,
} from 'date-fns';

const WeekView = ({ currentDate, appointments, selectedDate, onDateClick, setCurrentDate }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [visibleWeekStart] = useState(startOfWeek(currentDate, { weekStartsOn: 0 }));

  // Measure available height dynamically
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.getBoundingClientRect().height);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Scroll to current hour if current week
  useEffect(() => {
    if (isThisWeek(currentDate, { weekStartsOn: 0 }) && scrollRef.current) {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const offset = 120;
      scrollRef.current.scrollTop = Math.max(nowMinutes - offset, 0);
    }
  }, [containerHeight, currentDate]);

  const getAppointmentsForDay = (date) =>
    appointments.filter(appt => isSameDay(appt.date, date));


  const renderTimeLabels = () =>
    Array.from({ length: 24 }).map((_, hour) => (
      <div key={hour} className="h-[60px] text-xs text-right pr-1 py-1 text-gray-500">
        {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
      </div>
    ));

  const renderDayColumns = () => {
    return Array.from({ length: 7 }).map((_, i) => {
      const day = addDays(visibleWeekStart, i);
      const isToday = isSameDay(day, new Date());
      const dayAppointments = getAppointmentsForDay(day);

      const apptBlocks = dayAppointments.map((appt) => {
        const [hourStr, minuteStr] = appt.time.split(/[: ]/);
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        const isPM = appt.time.toLowerCase().includes('pm') && hour !== 12;
        const isAM = appt.time.toLowerCase().includes('am') && hour === 12;
        const startHour = isPM ? hour + 12 : isAM ? 0 : hour;
        const totalMinutes = startHour * 60 + minute;

        return (
          <div
            key={appt.id}
            className="absolute left-1 right-1 bg-[var(--appointment-color)] text-white rounded-md p-1 text-xs shadow-md overflow-hidden"
            style={{
              top: `${totalMinutes}px`,
              height: `${appt.duration}px`,
            }}
          >
            <div className="font-semibold truncate text-[var(--text-primary)]">{appt.clientName}</div>
            <div className="text-[10px] truncate text-[var(--text-secondary)]">{appt.service}</div>
          </div>
        );
      });

      const hourLines = Array.from({ length: 24 }).map((_, hour) => (
        <div
          key={hour}
          className="absolute left-0 right-0 border-t border-dashed border-gray-200"
          style={{ top: `${hour * 60}px` }}
        />
      ));

      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const timeIndicator = isToday ? (
        <div
          className="absolute left-0 right-0 h-[2px] bg-red-500 z-10"
          style={{ top: `${nowMinutes}px` }}
        />
      ) : null;

      return (
        <div
          key={i}
          className="flex-1 relative border-r last:border-r-0 bg-[var(--component-primary)]"
          style={{ height: '1440px' }}
        >
          {/* {hourLines} */}
          {apptBlocks}
          {timeIndicator}
        </div>
      );
    });
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col">
      <div className="border rounded-lg overflow-hidden flex-1 flex flex-col">
        <div className="flex border-b bg-gray-50">
          {/* Column Headers */}
          <div className="w-16 border-r bg-[var(--component-primary)]" />
          {Array.from({ length: 7 }).map((_, i) => {
            const day = addDays(visibleWeekStart, i);
            return (
              <div key={i} className="flex-1 text-center py-2 bg-[var(--component-primary)]">
                <div className="text-sm font-medium">{format(day, 'EEE')}</div>
                <div className="text-lg">{format(day, 'd')}</div>
              </div>
            );
          })}
        </div>

        <div className="flex overflow-x-auto flex-1 hide-scrollbar" ref={scrollRef}>
          <div className="w-16 border-r text-xs bg-[var(--component-primary)]" style={{ height: '1440px' }}>
            {renderTimeLabels()}
          </div>
          {renderDayColumns()}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
