import { format, isToday, getDaysInMonth, startOfMonth, getDay, getYear, getMonth } from 'date-fns';
const YearView = ({currentDate, selectedDate, setCurrentDate, setSelectedDate, setCurrentCalendarView, CALENDAR_VIEWS}) => {
  const year = getYear(currentDate);
  const months = [];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  for (let month = 0; month < 12; month++) {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = getDaysInMonth(firstDayOfMonth);
    const startDay = getDay(startOfMonth(firstDayOfMonth)); // 0 (Sun) - 6 (Sat)
    const isCurrentMonthAndYear = month === currentMonth && year === currentYear;
    const isSelectedMonth = month === getMonth(selectedDate) && year === getYear(selectedDate);

    

    const days = [];
    // Add empty slots before the first day
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-sm text-center text-gray-300">•</div>);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const isCurrentDayToday = isToday(dayDate);

      days.push(
        <div
          key={day}
          className={`
            text-xs
            flex items-center justify-center
            w-6 h-6
            rounded-full
            ${isCurrentDayToday ? 'bg-[var(--primary)] text-white font-bold' : 'text-gray-700'}
            ${!isCurrentDayToday ? "hover:bg-gray-300":""}
          `}
        >
          {day}
        </div>
      );
    }

    months.push(
      <div 
        key={month} 
        className={`
          p-2 rounded-lg cursor-pointer  
          ${isCurrentMonthAndYear ? 'bg-[var(--primary-light)]' : 'hover:bg-[var(--bg-color-hover)]'}
          ${isSelectedMonth ? 'border-[var(--primary)] border-2' : 'border-gray-200'}
        `}
        onClick={() => {
          const newDate = new Date(year, month, 1);
          setCurrentDate(newDate);
          setSelectedDate(newDate);
          setCurrentCalendarView(CALENDAR_VIEWS.MONTH);
        }}
      >
        <div className="ml-4 font-medium text-sm mb-1">{format(firstDayOfMonth, 'MMMM')}</div>
        <div className="grid grid-cols-7 gap-3 text-[10px]">
          {days}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <div className="text-xl font-semibold mb-4 text-center">{year}</div> */}
      <div className="grid grid-cols-3 gap-4">
        {months}
      </div>
    </div>
  );
};
export default YearView;