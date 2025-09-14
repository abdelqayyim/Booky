import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, User } from 'lucide-react';
import PopUpFormSkeleton from './PopUpFormSkeleton';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    serviceProvider: '',
    eventType: '',
    date: '',
    time: ''
  });

  const serviceProviders = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Consultant',
      specialty: 'Business Strategy',
      avatar: '👩‍⚕️'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Lead Developer',
      specialty: 'Technical Solutions',
      avatar: '👨‍💻'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Project Manager',
      specialty: 'Operations & Planning',
      avatar: '👩‍💼'
    },
    {
      id: 4,
      name: 'David Thompson',
      title: 'Senior Advisor',
      specialty: 'Financial Planning',
      avatar: '👨‍💼'
    }
  ];

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
    if (!formData.serviceProvider || !formData.eventType || !formData.date || !formData.time) {
      alert('Please fill in all fields');
      return;
    }
    
    const selectedProvider = serviceProviders.find(provider => provider.id === parseInt(formData.serviceProvider));
    console.log('Event created/rescheduled:', formData);
    // Here you would typically call your API or update function
    alert(`Event scheduled successfully!\nWith: ${selectedProvider?.name}\nType: ${formData.eventType}\nDate: ${formData.date}\nTime: ${formData.time}`);
    // You could dispatch an action to close the form here if needed
  };

  return (
    <PopUpFormSkeleton formTitle={"Create Event"} onClose={()=>{}}>
      <div className="space-y-6">
        {/* Service Provider Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Book With
          </label>
          <div className="relative">
            <select
              value={formData.serviceProvider}
              onChange={(e) => handleInputChange('serviceProvider', e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              required
            >
              <option value="">Select service provider</option>
              {serviceProviders.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} - {provider.title} ({provider.specialty})
                </option>
              ))}
            </select>
            <User size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Selected Provider Preview */}
          {formData.serviceProvider && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              {(() => {
                const selectedProvider = serviceProviders.find(p => p.id === parseInt(formData.serviceProvider));
                return selectedProvider ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{selectedProvider.avatar}</span>
                    <div>
                      <p className="font-medium text-gray-900">{selectedProvider.name}</p>
                      <p className="text-sm text-gray-600">{selectedProvider.title}</p>
                      <p className="text-sm text-blue-600">{selectedProvider.specialty}</p>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>

        {/* Event Type Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Event Type
          </label>
          <div className="relative">
            <select
              value={formData.eventType}
              onChange={(e) => handleInputChange('eventType', e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
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
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Time Picker */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <div className="relative">
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <Clock size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Event
          </button>
        </div>
      </div>
    </PopUpFormSkeleton>
  );
};

export default CreateEventForm;