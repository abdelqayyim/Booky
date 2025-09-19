import React, { useState } from "react";
import { Clock, Calendar, User, Phone, Mail, MapPin, DollarSign } from "lucide-react";
import PopUpFormSkeleton from './PopUpFormSkeleton';
import { setCurrentForm } from "../../redux/ui/uiSlice";
import { FORMS } from "./FormsContainer";
import { useDispatch } from "react-redux";

const AppointmentDetailPopUp = ({ appointment, onClose }) => {
  const dispatch = useDispatch();
  if (!appointment) {
    return null;
  }

  // Format date for display
  const formatDate = (date) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
  
    return parsedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-purple-100 text-purple-700';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'confirmed': return 'Confirmed Appointment';
      case 'pending': return 'Pending Confirmation';
      case 'cancelled': return 'Cancelled Appointment';
      default: return 'Upcoming Appointment';
    }
  };

  return (
    <PopUpFormSkeleton formTitle="Appointment Details" onClose={()=>{}}>
      <div className="space-y-4">
        {/* Header Section with Client Info and Status */}
        <div className="bg-[var(--bg-color)] rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                {appointment.clientName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-[var(--text-primary)] text-lg">{appointment.clientName}</h3>
                <p className="text-blue-600 font-medium">{appointment.service}</p>
              </div>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
              {getStatusText(appointment.status)}
            </span>
          </div>
        </div>

        {/* Appointment Details in 2 Columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-3">
            {/* Date and Time */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                Date & Time
              </label>
              <div className="flex items-center p-2 bg-[var(--bg-color)] rounded-lg border border-gray-200">
                <Calendar size={16} className="text-blue-600 mr-2" />
                <div className="text-sm text-[var(--text-primary)]">
                  <div className="font-medium text-[var(--text-primary)]">{formatDate(appointment.date)}</div>
                  <div className="text-xs text-[var(--text-secondary)]">{appointment.time}</div>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                Duration
              </label>
              <div className="flex items-center p-2 bg-[var(--bg-color)] rounded-lg border border-gray-200">
                <Clock size={16} className="text-blue-600 mr-2" />
                <span className="text-sm text-[var(--text-primary)]">{appointment.duration} minutes</span>
              </div>
            </div>

            {/* Phone */}
            {appointment.phone && (
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                  Phone
                </label>
                <div className="flex items-center p-2 bg-[var(--bg-color)] rounded-lg border border-gray-200">
                  <Phone size={16} className="text-blue-600 mr-2" />
                  <span className="text-sm text-[var(--text-primary)]">{appointment.phone}</span>
                </div>
              </div>
            )}

            {/* Price */}
            {appointment.price && (
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                  Price
                </label>
                <div className="flex items-center p-2 bg-[var(--bg-color)] rounded-lg border border-gray-200">
                  <DollarSign size={16} className="text-blue-600 mr-2" />
                  <span className="text-sm text-[var(--text-primary)]">${appointment.price}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {/* Client */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                Client
              </label>
              <div className="flex items-center p-2 bg-[var(--bg-color)] rounded-lg border border-gray-200">
                <User size={16} className="text-blue-600 mr-2" />
                <span className="text-sm text-[var(--text-primary)]">{appointment.clientName}</span>
              </div>
            </div>

            {/* Email */}
            {appointment.email && (
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                  Email
                </label>
                <div className="flex items-center p-2 bg-[var(--bg-color)] rounded-lg border border-gray-200">
                  <Mail size={16} className="text-blue-600 mr-2" />
                  <span className="text-sm text-[var(--text-primary)]">{appointment.email}</span>
                </div>
              </div>
            )}

            {/* Location */}
            {appointment.location && (
              <div>
                <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
                  Location
                </label>
                <div className="flex items-center p-2 bg-[var(--bg-color)] rounded-lg border border-gray-200">
                  <MapPin size={16} className="text-blue-600 mr-2" />
                  <span className="text-sm text-[var(--text-primary)]">{appointment.location}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notes - Full Width */}
        {appointment.notes && (
          <div>
            <label className="block text-xs font-medium text-[var(--text-primary)] mb-1">
              Notes
            </label>
            <div className="p-3 bg-[var(--bg-color)] rounded-lg border border-gray-200">
              <p className="text-sm text-[var(--text-primary)]">{appointment.notes}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={()=>{dispatch(setCurrentForm(FORMS.RESCHEDULE_EVENT))}}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Reschedule
          </button>
          <button
            onClick={()=>{dispatch(setCurrentForm(FORMS.CANCEL_EVENT))}}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
          >
            Close
          </button>
        )}
      </div>
    </PopUpFormSkeleton>
  );
};

export default AppointmentDetailPopUp;