import React, { useState } from 'react';
import { ARROW_UP, ARROW_DOWN } from '../../constants';
import { Tooltip } from '@mui/material';
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function OverrideSchedule({ weekStartDate, days }) {
  const [isOpen, setIsOpen] = useState(false);

  const weekStart = new Date(weekStartDate);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return (
    <div className="border rounded-lg p-4 bg-[var(--bg-color-secondary)] shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-[var(--text-primary)] font-semibold">
          Week: {weekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}
        </div>
        <Tooltip title={isOpen ? "Close" : "Expand"} placement="bottom">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="text-sm px-2 py-1 rounded-md bg-[var(--toggle-background)] text-[var(--text-primary)]"
        >
          <div>{isOpen ? ARROW_UP : ARROW_DOWN}</div>
        </button>
        </Tooltip>
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