import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, RefreshCw } from 'lucide-react';
import PopUpFormSkeleton from './PopUpFormSkeleton';

const RescheduleEventForm = ({ existingEvent = null }) => {
  const [formData, setFormData] = useState({
    eventType: existingEvent?.eventType || '',
    date: existingEvent?.date || '',
    time: existingEvent?.time || ''
  });

  const eventTypes = [
    'Meeting',
    'Consultation',
    'Interview',
    'Presentation',
    'Workshop',
    'Conference Call',
    'Training Session'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.eventType || !formData.date || !formData.time) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Event rescheduled:', formData);
    // Here you would typically call your API or update function
    alert(`Event rescheduled successfully!\nType: ${formData.eventType}\nDate: ${formData.date}\nTime: ${formData.time}`);
    // You could dispatch an action to close the form here if needed
  };

  return (
    <PopUpFormSkeleton formTitle={"Re-Schedule Event"} onClose={()=>{}}>
      <div className="space-y-6">
        {/* Current Event Info (if available) */}
        {existingEvent && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <RefreshCw size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Current Event</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Type:</strong> {existingEvent.eventType}</p>
              <p><strong>Date:</strong> {existingEvent.date}</p>
              <p><strong>Time:</strong> {existingEvent.time}</p>
              {existingEvent.serviceProvider && (
                <p><strong>With:</strong> {existingEvent.serviceProvider}</p>
              )}
            </div>
          </div>
        )}

        {/* Event Type Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">
            Event Type
          </label>
          <div className="relative text-[var(--text-primary)]">
            <select
              value={formData.eventType}
              onChange={(e) => handleInputChange('eventType', e.target.value)}
              className="w-full px-4 py-3 pr-10  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-[var(--bg-color)]  outline-none"
              required
            >
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Date Picker */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">
            New Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[var(--bg-color)]   outline-none"
              required
            />
            <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Time Picker */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">
            New Time
          </label>
          <div className="relative">
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[var(--bg-color)]  outline-none"
              required
            />
            <Clock size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-primary)] pointer-events-none" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <RefreshCw size={18} />
            <span>Send Re-Schedule Request</span>
          </button>
        </div>
      </div>
    </PopUpFormSkeleton>
  );
};

export default RescheduleEventForm;