import React, { useState } from 'react';
import { Calendar, Clock, X, AlertTriangle } from 'lucide-react';
import PopUpFormSkeleton from './PopUpFormSkeleton';

const CancelEventForm = ({ existingEvent = null }) => {
  const [cancellationReason, setCancellationReason] = useState('');
  const [confirmCancel, setConfirmCancel] = useState(false);

  const cancellationReasons = [
    'Schedule conflict',
    'Personal emergency',
    'Illness',
    'Travel issues',
    'Work priority change',
    'No longer needed',
    'Technical difficulties',
    'Other'
  ];

  const handleSubmit = () => {
    if (!confirmCancel) {
      alert('Please confirm that you want to cancel this event');
      return;
    }
    
    console.log('Event cancelled:', {
      event: existingEvent,
      reason: cancellationReason,
      cancelledAt: new Date().toISOString()
    });
    
    // Here you would typically call your API or update function
    alert(`Event cancelled successfully!\nReason: ${cancellationReason || 'No reason provided'}`);
    // You could dispatch an action to close the form here if needed
  };

  return (
    <PopUpFormSkeleton formTitle={"Cancel Event"} onClose={() => { }}>
      <div className="space-y-6">
        {/* Event Details */}
        {existingEvent ? (
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-sm font-medium text-red-700">Event to be Cancelled</span>
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar size={14} className="text-gray-500" />
                <span><strong>Date:</strong> {existingEvent.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-gray-500" />
                <span><strong>Time:</strong> {existingEvent.time}</span>
              </div>
              <p><strong>Type:</strong> {existingEvent.eventType}</p>
              {existingEvent.serviceProvider && (
                <p><strong>With:</strong> {existingEvent.serviceProvider}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-[var(--bg-color)] rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-[var(--text-primary)]">No Event Selected</span>
            </div>
            <p className="text-sm text-[var(--text-primary)]">Please select an event to cancel from your calendar.</p>
          </div>
        )}

        {/* Cancellation Reason */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--text-primary)]">
            Reason for Cancellation <span className="text-gray-400">(Optional)</span>
          </label>
          <div className="relative">
            <select
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-[var(--bg-color)]"
            >
              <option value="">Select a reason (optional)</option>
              {cancellationReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            <AlertTriangle size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Custom Reason Text Area */}
        {cancellationReason === 'Other' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Please specify
            </label>
            <textarea
              placeholder="Please provide details about your cancellation..."
              className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
              rows="3"
            />
          </div>
        )}

        {/* Cancellation Policy Notice */}
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start space-x-2">
            <AlertTriangle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Cancellation Policy</p>
              <p>Events cancelled less than 24 hours in advance may be subject to a cancellation fee. Please review our terms and conditions.</p>
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="confirmCancel"
            checked={confirmCancel}
            onChange={(e) => setConfirmCancel(e.target.checked)}
            className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <label htmlFor="confirmCancel" className="text-sm text-[var(--text-primary)]">
            I understand that this action cannot be undone and I want to cancel this event.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!confirmCancel}
            className={`w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors ${
              confirmCancel 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Cancel Event</span>
          </button>
        </div>
      </div>
    </PopUpFormSkeleton>
  );
};

export default CancelEventForm;