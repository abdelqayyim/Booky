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
import Table from '../../components/Table';

const ProviderDashboardPage = (props) => {
  const dispatch = useDispatch();
  const currentUserState = useSelector((state)=>state.user)
  const currentDate = useSelector((state) => state.ui?.currentDate);
  const { apps, monthlyData } = currentUserState;
  const appointments = useSelector((state) => state.user?.appointments || []);

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

  const userLogo = (userLogo) => {
    return <div className="w-[35px] h-[35px] rounded-full bg-[var(--primary)] text-white flex flex-col items-center justify-center">
                {userLogo}
              </div>
  }

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
  
  const statusColorMap = {
  "primary": "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary",
  "accent-gold": "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/20 dark:text-accent-gold",
  "red": "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  "green": "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  };

  const activities = [
  {
    icon: "add",
    bgColor: "#6366f1", // Tailwind indigo-500 equivalent
    title: "New Booking",
    description: "Emily R. reserved Standard Room for Nov 12.",
    timestamp: "2 mins ago",
    timestampColor: "text-primary",
  },
  {
    icon: "check_circle",
    bgColor: "#10b981", // green-500
    title: "Payment Verified",
    description: "Transaction #9920 was successfully processed.",
    timestamp: "1 hour ago",
  },
  {
    icon: "star",
    bgColor: "#d1ac79", // accent-gold
    title: "Review Received",
    description: "John D. gave a 5-star rating for the Deluxe Suite stay.",
    timestamp: "5 hours ago",
  },
  {
    icon: "mail",
    bgColor: "#9ca3af", // slate-400
    title: "Email Sent",
    description: "Confirmation email sent to Marcus Thorne.",
    timestamp: "Yesterday",
  },
];

  const RecentActivity = ({ activities, onClear }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text-primary)] dark:text-white">Recent Activity</h2>
        <button
          onClick={onClear}
          className="text-slate-500 text-sm font-medium hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Activity List */}
      <div className="rounded-2xl border bg-[var(--bg-secondary)] p-6 shadow-sm">
        <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">
          {activities.map((activity, idx) => (
            <div key={idx} className="relative pl-8">
              {/* Icon Circle */}
              <div
                className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center  dark:ring-slate-900`}
                style={{ backgroundColor: activity.bgColor }}
              >
                <span className="material-symbols-outlined">
                  {activity.icon}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  {activity.title}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">{activity.description}</p>
                <p
                  className={`text-[10px] font-bold uppercase ${
                    activity.timestampColor || "text-slate-400"
                  }`}
                >
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
    

  return (
    <div className="p-6 bg-[var(--bg-primary)]">
      {/* Stats Grid */}
      <div className="grid gap-4 w-full 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-4">
        {providerStats.map((card, index) => (
          <StatCard key={index + 1} card={card} />
        ))}
      </div>

      {/* <!-- Main Grid Layout --> */}
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* <!-- Upcoming Bookings Table --> */}
          {/* <!-- Upcoming Bookings --> */}
<div className="space-y-4 lg:col-span-2">
  {/* Header */}
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-bold text-[var(--text-primary)] dark:text-white">
      Upcoming Bookings
    </h2>

    <button className="text-slate-500 text-sm font-medium hover:underline">
      View all
    </button>
  </div>

  {/* Table */}
  <Table
      columns={["Customer", "Date & Time", "Service", "Status"]}
      data={appointments.map(app => ({
        Customer: { name: app.clientName, image: app.clientImage },
        Service: app.service,
        "Date & Time": app.date,
        date: new Date(app.date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        time: app.time,
        Status: app.status,
      }))}
    />
</div>


        
{/* <!-- Recent Activity Feed --> */}
<RecentActivity activities={activities} onClear={() => console.log("Cleared!")} />
        
</div>
</div>
  );
};
export default ProviderDashboardPage;
