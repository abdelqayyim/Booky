import React from "react";
import { Clock, Calendar } from "lucide-react";

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex">
        {/* Left accent color bar */}

        <div className="flex-1">
          <div className="p-4">
            <div className="flex items-center">
              {/* Profile Image */}
              <div className="w-[35px] h-[35px] rounded-full bg-[var(--primary)] text-white flex flex-col items-center justify-center">
                A
              </div>

              {/* Client and Service Info */}
              <div className="ml-4">
                <h3 className="font-bold text-gray-800 text-lg">
                  {appointment.clientName}
                </h3>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                </div>
              </div>
            </div>

            {/* Time and Duration Info */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm font-medium">
                    {appointment.time}
                  </span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">
                    {appointment.duration} minutes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
            <span
              className={`text-xs bg-[#F1E9FB] font-medium uppercase px-2 py-1 rounded-full text-purple-700`}
            >
              Upcoming
            </span>
            <div className="space-x-2">
              <button className="text-gray-500 hover:text-gray-700 text-sm">
                Reschedule
              </button>
              <button className="text-red-500 hover:text-red-700 text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
