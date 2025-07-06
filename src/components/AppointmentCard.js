import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentForm } from "../redux/ui/uiSlice";
import { Clock, Calendar, MoreVertical } from "lucide-react";
import { FORMS } from "./Forms/FormsContainer";
import { setSelectedAppointment } from "../redux/user/userSlice";

const AppointmentCard = ({ appointment, bgColor }) => {
  const dispatch = useDispatch();

  const handleMenuClick = (e) => {
    e.stopPropagation(); // Prevent card click
    dispatch(
      setSelectedAppointment({
        ...appointment,
        date: new Date(appointment.date).toISOString(), // serialize date
      })
    );
    dispatch(setCurrentForm(FORMS.APPOINTMENT_DETAIL_POP_UP));
  };

  return (
    <div className="w-full">
      <div
        onClick={handleMenuClick}
        className={`${bgColor} rounded-xl shadow-md overflow-hidden border-none border-gray-100 flex cursor-pointer hover:shadow-lg transition-shadow`}
      >
        <div className="flex-1">
          <div className="p-4 relative">
            <div className="flex items-center pr-8">
              {" "}
              {/* Added right padding to avoid overlap with menu */}
              {/* Profile Image */}
              <div className="w-[35px] h-[35px] rounded-full bg-[var(--primary)] text-white flex flex-col items-center justify-center">
                {appointment.clientName
                  ? appointment.clientName.charAt(0)
                  : "A"}
              </div>
              {/* Client and Service Info */}
              <div className="ml-4">
                <h3 className="font-bold text-[var(--secondary)] text-lg">
                  {appointment.clientName}
                </h3>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-[var(--secondary)]">
                    {appointment.service}
                  </p>
                </div>
              </div>
            </div>

            {/* Time and Duration Info */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-[var(--secondary)]">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm font-medium">
                    {appointment.time}
                  </span>
                </div>

                <div className="flex items-center text-[var(--secondary)]">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">
                    {appointment.duration} minutes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-[var(--bg-color-secondary)] px-4 py-3 flex justify-between items-center">
            <span
              className={`text-xs bg-[#F1E9FB] font-medium uppercase px-2 py-1 rounded-full text-purple-700`}
            >
              Upcoming
            </span>
            <div className="space-x-2">
              <button
                className="text-gray-500 hover:text-gray-700 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setCurrentForm(FORMS.RESCHEDULE_EVENT));
                }}
              >
                Reschedule
              </button>
              <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setCurrentForm(FORMS.CANCEL_EVENT));
                }}
              >
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