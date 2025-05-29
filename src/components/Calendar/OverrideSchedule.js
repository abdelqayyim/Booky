import React, { useState } from 'react';
import { ARROW_UP, ARROW_DOWN } from '../../pages/constants';
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function OverrideSchedule({ weekStartDate, days }) {
  const [isOpen, setIsOpen] = useState(false);

  const weekStart = new Date(weekStartDate);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-[var(--text-secondary)] font-semibold">
          Week: {weekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
        </div>
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="text-sm px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          <div>{isOpen ? ARROW_UP : ARROW_DOWN}</div>
        </button>
      </div>

      
      {/* Schedule Details */}
      {isOpen && (
        <div className="space-y-3 mt-2">
          {DAYS.map((day) => {
            const blocks = days[day] || [];
            return (
              <div key={day}>
                <div className="font-medium">{day}</div>
                {blocks.length > 0 ? (
                  <div className="space-y-1 ml-2">
                    {blocks.map((block, idx) => (
                      <div key={idx} className="text-sm text-[var(--text-secondary)]">
                        {block.startTime} - {block.endTime}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm italic text-[var(--text-secondary)] ml-2">No override</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}