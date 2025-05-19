import React, { useState, useEffect } from 'react';
import {
  format,
  startOfDay,
  addHours,
  isToday,
  getHours,
  getMinutes,
} from 'date-fns';

const DayView = ({ currentDate, appointments }) => {
  const [now, setNow] = useState(new Date());

  // Update current time every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const renderDayView = () => {
    const hours = [];
    const dayStart = startOfDay(currentDate);
    const isCurrentDay = isToday(currentDate);
  
    // Create hour rows
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
            <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-300 z-0"></div>
          </div>
        </div>
      );
    }
  
    // Render appointments
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
  
      const minutesFromStart = (start.getHours() * 60) + start.getMinutes();
      const top = (minutesFromStart / (24 * 60)) * (24 * 60); // 1px per minute
      const height = appt.duration; // assuming 1px per minute
  
      return (
        <div
          key={appt.id}
          className="absolute left-20 right-2 bg-blue-200 rounded-md p-2 text-sm shadow-md overflow-hidden"
          style={{
            top: `${top}px`,
            height: `${height}px`,
          }}
        >
          <div className="font-semibold">{appt.clientName}</div>
          <div className="text-xs text-gray-600">{appt.service}</div>
        </div>
      );
    });
  
    return (
      <div>
        {/* <div className="text-lg font-semibold mb-4">
          {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </div> */}
        <div className="border rounded-lg overflow-hidden relative" style={{ height: `${24 * 60}px` }}>
          {appointmentElements}
          {hours}
        </div>
      </div>
    );
  };
  

  return renderDayView();
};

export default DayView;
