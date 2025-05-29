import React, { useState, useEffect, useRef } from 'react';
import {
  format,
  startOfDay,
  addHours,
  isToday,
  getHours,
  getMinutes,
  addDays,
  subDays,
  isSameDay
} from 'date-fns';

const DayView = ({ currentDate, appointments, setCurrentDate }) => {
  const [now, setNow] = useState(new Date());
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(null);
  const [visibleRangeStart, setVisibleRangeStart] = useState(subDays(currentDate, 3));

  // Update current time every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  // Measure available height
  useEffect(() => {
    if (containerRef.current) {
      const resize = () => {
        setContainerHeight(containerRef.current.getBoundingClientRect().height);
      };
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
  }, []);

  // Scroll to current time
  useEffect(() => {
    if (isToday(currentDate) && scrollRef.current && containerHeight) {
      const minutesFromMidnight = getHours(now) * 60 + getMinutes(now);
      const offset = 120;
      const scrollTop = Math.max(minutesFromMidnight - offset, 0);
      scrollRef.current.scrollTop = scrollTop;
    }
  }, [currentDate, now, containerHeight]);

  // 🔽 Date Selector Bar
  const renderDateSelector = () => {
    const days = [];
    for (let i = 0; i < 10; i++) {
      const day = addDays(visibleRangeStart, i);
      const isSelected = isSameDay(day, currentDate);

      days.push(
        <button
          key={i}
          onClick={() => setCurrentDate(day)}
          className={`px-3 py-2 rounded-md text-sm font-medium shadow-sm 
            ${isSelected
              ? 'bg-[var(--toggle-button-background)] border border-black-200 text-[var(--secondary)]'
              : 'bg-[var(--toggle-background)] text-[var(--secondary)] hover:bg-[var(--toggle-button-background)]'
            }`}
        >
          <div className="text-xs">{format(day, 'EEE')}</div>
          <div className="text-sm">{format(day, 'd')}</div>
        </button>
      );
    }

    return (
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--component-primary)] border-b border-gray-200">
        <button
          onClick={() => setVisibleRangeStart(subDays(visibleRangeStart, 1))}
          className="text-xl px-2 py-1 rounded hover:bg-[var(--toggle-background)]"
        >
          ←
        </button>
        <div className="flex gap-2 overflow-x-auto">{days}</div>
        <button
          onClick={() => setVisibleRangeStart(addDays(visibleRangeStart, 1))}
          className="text-xl px-2 py-1 rounded hover:bg-[var(--toggle-background)]"
        >
          →
        </button>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = [];
    const dayStart = startOfDay(currentDate);
    const isCurrentDay = isToday(currentDate);

    for (let i = 0; i < 24; i++) {
      const hour = addHours(dayStart, i);
      const hourFormatted = format(hour, 'h a');
      const isCurrentHour = isCurrentDay && getHours(now) === i;
      const minutes = getMinutes(now);

      hours.push(
        <div key={i} className="relative flex border-t border-gray-200 h-[60px]">
          <div className="w-20 pt-1 pr-3 text-right text-sm text-[var(--text-secondary)]">
            {hourFormatted}
          </div>
          <div className="flex-1 relative">
            {isCurrentHour && (
              <div
                className="absolute left-0 right-0 h-[2px] bg-red-500 z-10"
                style={{ top: `${(minutes / 60) * 100}%` }}
              />
            )}
            {/* <div className="absolute top-1/2 left-0 right-0 border-t borddasheder- border-gray-300 z-0"></div> */}
          </div>
        </div>
      );
    }

    const appointmentElements = appointments.map((appt) => {
      const start = new Date(currentDate);
      const [hourStr, minuteStr] = appt.time.split(/[: ]/);
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const isPM = appt.time.toLowerCase().includes('pm') && hour !== 12;
      const isAM = appt.time.toLowerCase().includes('am') && hour === 12;
      const startHour = isPM ? hour + 12 : isAM ? 0 : hour;

      start.setHours(startHour);
      start.setMinutes(minute);
      start.setSeconds(0);
      start.setMilliseconds(0);

      const minutesFromStart = start.getHours() * 60 + start.getMinutes();
      const top = minutesFromStart;
      const height = appt.duration || 30;

      return (
        <div
          key={appt.id}
          className="absolute z-10 left-20 right-2 bg-[var(--appointment-color)] rounded-md p-2 text-sm shadow-md overflow-hidden"
          style={{
            top: `${top}px`,
            height: `${height}px`,
          }}
        >
          <div className="font-semibold text-[var(--text-primary)]">{appt.clientName}</div>
          <div className="text-xs text-[var(--text-secondary)]">{appt.service}</div>
        </div>
      );
    });

    return (
      <div ref={containerRef} className="h-full flex flex-col">
        {renderDateSelector()}
        {containerHeight && (
          <div
            ref={scrollRef}
            className="overflow-y-auto border rounded-lg hide-scrollbar"
            style={{ height: containerHeight }}
          >
            <div style={{ height: `${24 * 60}px`, position: 'relative' }}>
              {appointmentElements}
              {hours}
            </div>
          </div>
        )}
      </div>
    );
  };

  return renderDayView();
};

export default DayView;
