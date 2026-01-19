import React, {useEffect} from 'react';
import Calendar from '../../components/Calendar';
import { getAppointmentsAndSchedules } from '../../redux/user/apiRequests';

import { useSelector } from "react-redux";
import { ADD_BUTTON, DOLLAR_SIGN_SVG, FILE_DOWNLOAD_SVG } from "../../constants";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StatCard from "../../components/StatCard";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import Table from '../../components/Table';
import { CALENDAR_SVG } from '../../constants';


const ProviderAppointmentsPage = (props) => {
  const dispatch = useDispatch();
  const currentUserState = useSelector((state)=>state.user)
  const { apps, monthlyData } = currentUserState;
  const appointments = useSelector((state) => state.user?.appointments || []);
  
  const tableColumns = ["Booking ID", "Customer", "Service", "Date & Time", "Amount", "Status"]
  
  useEffect(() => {
    dispatch(getAppointmentsAndSchedules());
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
   const bookings = [
  {
    date: "Oct 24, 2023",
    time: "10:00 AM",
    customer: { name: "Sarah Jenkins", initials: "SJ", color: "primary" },
    property: "Deluxe Suite",
    status: { label: "Confirmed", color: "primary" },
  },
  {
    date: "Oct 25, 2023",
    time: "02:30 PM",
    customer: { name: "Marcus Thorne", initials: "MT", color: "accent-gold" },
    property: "Studio Appt",
    status: { label: "Pending", color: "accent-gold" },
  },
  {
    date: "Oct 27, 2023",
    time: "11:00 AM",
    customer: { name: "Emily Rose", initials: "ER", color: "primary" },
    property: "Standard Room",
    status: { label: "Confirmed", color: "primary" },
  },
  ];
  
  return (
    <div className="p-6 bg-[var(--bg-primary)]">
      {/* Page Title and Filter */}
      
      <div className="grid gap-4 w-full 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-4">
        {providerStats.map((card, index) => (
          <StatCard key={index + 1} card={card} />
        ))}
      </div>

    {/* <div className='w-full flex-1 overflow-y-scroll'>
        <Calendar/>
    </div> */}
      

      <section className="bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--primary-20)] dark:border-gray-700 shadow-sm mt-6">
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
    {/* Filters */}
    <div className="flex flex-wrap items-center gap-4">
      {/* Status Filter */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-[var(--primary)] ml-1">STATUS</span>
        <select className="form-select text-sm rounded-lg border border-[var(--primary-20)] bg-[var(--bg-primary)] focus:ring-[var(--primary)] focus:border-[var(--primary)] min-w-[140px] px-3 py-2">
  <option>All Statuses</option>
  <option>Confirmed</option>
  <option>Pending</option>
  <option>Cancelled</option>
</select>

      </div>

      {/* Date Range */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-[var(--primary)] ml-1">DATE RANGE</span>
        <button className="flex items-center gap-2 text-sm px-4 py-2 border border-[var(--primary-20)] dark:border-gray-700 rounded-lg bg-[var(--bg-primary)] hover:border-primary transition-colors min-w-[200px]">
                <span className="material-symbols-outlined text-lg">{CALENDAR_SVG}</span>
          <span>Oct 01 - Oct 31, 2023</span>
        </button>
      </div>

      {/* Service Type */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-[var(--primary)] ml-1">SERVICE TYPE</span>
        <select className="form-select text-sm rounded-lg border border-[var(--primary-20)] bg-[var(--bg-primary)] focus:ring-[var(--primary)] focus:border-[var(--primary)] min-w-[140px] px-3 py-2">
          <option>All Services</option>
          <option>Property Cleaning</option>
          <option>Garden Maintenance</option>
          <option>Electrical Repair</option>
          <option>Interior Design</option>
        </select>
      </div>

      {/* Clear All */}
      <div className="flex items-end h-full mt-auto">
        <button className="text-sm text-[var(--primary)] font-semibold text-primary hover:underline px-2 mb-2">
          Clear all
        </button>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex items-center gap-2 self-end lg:self-center">
      <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-primary)] border border-[var(--primary-20)] rounded-lg text-sm font-semibold hover:bg-[var(--primary-20)] transition-colors">
              <span className="material-symbols-outlined text-lg">{FILE_DOWNLOAD_SVG}</span>
        Export
      </button>
      <button className="flex items-center gap-2 px-6 py-2 bg-[var(--primary)] text-[var(--text-primary)] border border-[var(--primary-20)] rounded-lg text-sm font-bold hover:bg-opacity-90 transition-all shadow-md">
              <span className="material-symbols-outlined text-lg">{ADD_BUTTON}</span>
        New Booking
      </button>
    </div>
  </div>
</section>

      
      <Table
  columns={["Customer", "Service", "Date & Time", "Amount", "Status"]}
  data={appointments.map(app => ({
    // "Booking ID": `#BK-${app.id}`,
    Customer: { name: app.clientName, image: app.clientImage },
    Service: app.service,
    "Date & Time": app.date,
    date: new Date(app.date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    time: app.time,
    Amount: `$${app.price.toFixed(2)}`,
    Status: app.status,
  }))}
/>


</div>
  )
};

export default ProviderAppointmentsPage;
