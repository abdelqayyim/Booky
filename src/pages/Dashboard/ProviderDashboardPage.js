import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { DOLLAR_SIGN_SVG } from "../constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StatCard from "../../components/StatCard";
import StarIcon from "@mui/icons-material/Star";
import AppointmentCard from "../../components/AppointmentCard";
import { isSameDay } from "date-fns";
const ProviderDashboardPage = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const appointments = useSelector((state) => state.user.appointments);

  const providerStats = [
    {
      title: "Total Bookings",
      value: 6,
      logo: <CalendarMonthIcon />,
      metric: "12.5% from last month",
      color: "#4f46e5",
    },
    {
      title: "Completed This Month",
      value: 42,
      logo: <CheckCircleIcon />,
      metric: "12.5% from last month",
      color: "#10b981",
    },
    {
      title: "Reviews",
      value: 4.2,
      logo: <StarIcon />,
      metric: "12.5% from last month",
      color: "#f59e0b",
    },
    {
      title: "Monthly Revenue",
      value: "$3,840",
      logo: DOLLAR_SIGN_SVG,
      metric: "12.5% from last month",
      color: "#ef4444",
    },
  ];

  const filterAppointmentsByView = (view, currentDate, appointments) => {
    return appointments.filter((appt) =>
      isSameDay(new Date(appt.date), currentDate)
    );
  };

  // {filteredAppointments.map((appointment) => (
  //   <AppointmentCard
  //     key={appointment.id}
  //     appointment={appointment}
  //     bgColor="bg-white"
  //   />
  // ))}

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) =>
      isSameDay(new Date(appt.date), currentDate)
    );
  });

  return (
    <div className="h-full flex flex-col px-[25px] bg-transparent overflow-hidden">
  {/* Page Title and Filter */}
  <div className="mb-[10px]">
    <h1 className="text-[var(--text-primary)] text-[45px] font-bold">
      Dashboard
    </h1>
  </div>

  {/* Stats Grid */}
  <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] auto-rows-fr gap-[20px] mb-[15px]">
    {providerStats.map((card, index) => (
      <StatCard key={index} card={card} />
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
        {filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            bgColor="bg-[var(--component-primary)]"
          />
        ))}
      </div>
    </div>

    {/* Right panel */}
    <div className="flex-1 bg-red-200 ">Hello</div>
  </div>
</div>

  );
};

export default ProviderDashboardPage;
