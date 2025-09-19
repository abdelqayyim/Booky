import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { DOLLAR_SIGN_SVG } from "../../constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StatCard from "../../components/StatCard";
import StarIcon from "@mui/icons-material/Star";
import AppointmentCard from "../../components/AppointmentCard";
import { isSameDay } from "date-fns";
import DayView from "../../components/Calendar/DayView";
import { getTodayAppointmentsAndMonthStats } from "../../redux/user/apiRequests";
import { useDispatch } from "react-redux";

const ProviderDashboardPage = (props) => {
  const dispatch = useDispatch();
  const currentUserState = useSelector((state)=>state.user)
  const currentDate = useSelector((state) => state.ui?.currentDate);
  const { appointments, monthlyData } = currentUserState;

  useEffect(() => {
    dispatch(getTodayAppointmentsAndMonthStats());
}, [dispatch]);
  const providerStats = [
    {
      title: "Total Bookings",
      value: monthlyData.bookings,
      logo: <CalendarMonthIcon />,
      metric: "12.5% from last month",
      color: "#4f46e5",
    },
    {
      title: "Completed This Month",
      value: monthlyData.completed,
      logo: <CheckCircleIcon />,
      metric: "12.5% from last month",
      color: "#10b981",
    },
    {
      title: "Reviews",
      value: monthlyData.reviews,
      logo: <StarIcon />,
      metric: "12.5% from last month",
      color: "#f59e0b",
    },
    {
      title: "Monthly Revenue",
      value: "$" + monthlyData.revenue.toLocaleString(),
      logo: DOLLAR_SIGN_SVG,
      metric: "12.5% from last month",
      color: "#ef4444",
    },
  ];

  const filterAppointmentsByView = (currentDate, appointments) => {
    return appointments?.filter((appt) =>
      isSameDay(new Date(appt.date), currentDate)
    );
  };

  const filteredAppointments = useMemo(
    () => filterAppointmentsByView(currentDate, appointments),
    [currentDate, appointments]
  );

  return (
    <div className="h-full flex flex-col px-[25px] bg-transparent overflow-hidden pl-[10px] pt-[5px]">
      {/* Page Title and Filter */}
      <div className="">
        <h1 className="text-[var(--text-primary)] text-[45px] font-bold">
          Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 w-full 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-4">
        {providerStats.map((card, index) => (
          <StatCard key={index + 1} card={card} />
        ))}
      </div>

      {/* This will grow to fill the remaining vertical space */}
      <div className="h-full w-full flex flex-row overflow-hidden">
        {/* Left panel */}
        <div className="w-[300px] flex flex-col mr-6 h-full ">
          <div className="mb-2 font-bold text-[var(--secondary)] text-lg sticky top-0 z-10 pt-2 pb-2">
            Appointments
          </div>

          <div className="overflow-y-auto flex-grow pb-4 hide-scrollbar space-y-4">
            {filteredAppointments && filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                bgColor="bg-[var(--component-primary)]"
              />
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col">
          <div className="mb-2 font-bold text-[var(--secondary)] text-lg sticky top-0 z-10 pt-2 pb-2">
            Calendar
          </div>

          <div className="flex-1 mb-4 overflow-y-auto">
            <DayView />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProviderDashboardPage;
