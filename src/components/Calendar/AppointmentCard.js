import React from 'react'; 

const AppointmentCard = ({ appointment }) => {
  return (
    <div key={appointment.id} className="p-3 rounded-lg bg-[var(--bg-color)] shadow-sm flex items-center space-x-3">
      <img src={appointment.clientImage} alt={appointment.clientName} className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <h3 className="font-medium">{appointment.clientName}</h3>
        <p className="text-sm text-[var(--text-secondary)]">{appointment.service}</p>
      </div>
      <div className="text-right">
        <div className="font-medium">{appointment.time}</div>
        <div className="text-sm text-[var(--text-secondary)]">{appointment.duration} min</div>
      </div>
    </div>
  )
};

export default AppointmentCard;