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
  const schedules = useSelector((state) => ({
    default: state.user.defaultSchedule,
    overrideSchedule: state.user.overrideSchedule,
  }));

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

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) =>
      isSameDay(new Date(appt.date), currentDate)
    );
  });

  console.log(`filteredAppointments`, filteredAppointments);

  return (
    <div className="h-full flex flex-col p-[25px] bg-transparent">
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
      <div className="w-full flex-grow flex flex-row overflow-scroll hide-scrollbar">
        <div className="w-[350px] rounded-md relative">
  {/* Sticky Header */}
  <div className="sticky top-0 z-10 bg-[var(--component-primary)] font-bold text-[var(--secondary)] text-lg pl-2 py-2">
    Appointments
  </div>

  {/* Spacer to simulate bottom margin below the sticky element */}
  <div className="h-4" />

  {/* Appointment List */}
  <div className="space-y-4">
    {filteredAppointments.map((appointment) => (
      <AppointmentCard
        key={appointment.id}
        appointment={appointment}
        bgColor="bg-white"
      />
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default ProviderDashboardPage;
