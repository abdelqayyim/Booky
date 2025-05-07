import React from 'react';
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
} from 'date-fns';

const WeekView = ({ currentDate, appointments, selectedDate, onDateClick }) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });

  const getAppointmentsForDay = (date) => {
    return appointments.filter(appt => isSameDay(appt.date, date));
  };

  const renderDayHeaders = () => {
    return (
      <>
        <div className="w-16 border-r bg-gray-50" /> {/* Empty cell for time labels */}
        {Array.from({ length: 7 }).map((_, i) => {
          const day = addDays(weekStart, i);
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div
              key={i}
              className={`flex-1 text-center py-2 cursor-pointer border-b
                ${isToday ? 'bg-[var(--primary-light)]' : ''}
                ${isSelected ? 'border-b-2 border-[var(--primary)]' : ''}`}
              onClick={() => onDateClick(day)}
            >
              <div className="text-sm font-medium">{format(day, 'EEE')}</div>
              <div className={`text-lg ${isSelected ? 'font-bold' : ''}`}>{format(day, 'd')}</div>
            </div>
          );
        })}
      </>
    );
  };

  const renderTimeLabels = () => {
    return Array.from({ length: 24 }).map((_, hour) => (
      <div
        key={hour}
        className="h-[60px] text-xs text-right pr-1 py-1 text-gray-500"
      >
        {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
      </div>
    ));
  };

  const renderDayColumns = () => {
    const now = new Date();
  
    return Array.from({ length: 7 }).map((_, i) => {
      const day = addDays(weekStart, i);
      const isToday = isSameDay(day, now);
      const dayAppointments = getAppointmentsForDay(day);
  
      const apptBlocks = dayAppointments.map((appt) => {
        const [hourStr, minuteStr] = appt.time.split(/[: ]/);
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        const isPM = appt.time.toLowerCase().includes('pm') && hour !== 12;
        const isAM = appt.time.toLowerCase().includes('am') && hour === 12;
        const startHour = isPM ? hour + 12 : isAM ? 0 : hour;
        const totalMinutes = (startHour * 60) + minute;
  
        return (
          <div
            key={appt.id}
            className="absolute left-1 right-1 bg-blue-300 text-white rounded-md p-1 text-xs shadow-md overflow-hidden"
            style={{
              top: `${totalMinutes}px`,
              height: `${appt.duration}px`,
            }}
          >
            <div className="font-semibold truncate">{appt.clientName}</div>
            <div className="text-[10px] truncate">{appt.service}</div>
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
  
      // 🔴 Red line if it's today
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
          className="flex-1 relative border-r last:border-r-0 bg-white"
          style={{ height: '1440px' }}
        >
          {hourLines}
          {apptBlocks}
          {timeIndicator}
        </div>
      );
    });
  };
  

  return (
    <div className="mt-4">
      <div className="border rounded-lg overflow-hidden">
        {/* Day headers */}
        <div className="flex border-b bg-gray-50">
          {renderDayHeaders()}
        </div>

        {/* Time grid + appointment columns */}
        <div className="flex overflow-x-auto">
          {/* Time column */}
          <div className="w-16 border-r text-xs bg-white" style={{ height: '1440px' }}>
            {renderTimeLabels()}
          </div>

          {/* Day columns */}
          {renderDayColumns()}
        </div>
      </div>
    </div>
  );
};


export default WeekView;
