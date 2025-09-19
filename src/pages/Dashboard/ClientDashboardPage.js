import React from 'react';
import { useSelector } from 'react-redux';
import { ROLES } from '../../redux/user/userSlice';
import { CHECKED_CALENDAR_SVG, ACTIVE_USERS_SVG, STOREFRONT_SVG, DOLLAR_SIGN_SVG } from '../../constants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StatCard from '../../components/StatCard';
import StarIcon from '@mui/icons-material/Star';
import ProfileDropdown from '../../components/ProfileDropdown';

const ClientDashboardPage = (props) => {
    // const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const adminStats = [
        {
            title: "Total Bookings",
            value: 6,
            logo: CHECKED_CALENDAR_SVG,
            metric: "12.5% from last month",
            color: "#4f46e5",
        },
        {
            title: "Active Users",
            value: 6,
            logo: ACTIVE_USERS_SVG,
            metric: "12.5% from last month",
            color: "#10b981",
        },
        {
            title: "Active Providers",
            value: 6,
            logo: STOREFRONT_SVG,
            metric: "12.5% from last month",
            color: "#f59e0b",
        },
        {
            title: "Revenue",
            value: 6,
            logo: DOLLAR_SIGN_SVG,
            metric: "12.5% from last month",
            color: "#ef4444",
        }
    ]
    const providerStats = [
        {
            title: "Total Bookings",
            value: 6,
            logo: <CalendarMonthIcon/>,
            metric: "12.5% from last month",
            color: "#4f46e5",
        },
        {
            title: "Completed This Month",
            value: 42,
            logo: <CheckCircleIcon/>,
            metric: "12.5% from last month",
            color: "#10b981",
        },
        {
            title: "Reviews",
            value: 4.2,
            logo: <StarIcon/>,
            metric: "12.5% from last month",
            color: "#f59e0b",
        },
        {
            title: "Monthly Revenue",
            value: "$3,840",
            logo: DOLLAR_SIGN_SVG,
            metric: "12.5% from last month",
            color: "#ef4444",
        }
    ]

    const adminView = () => {
        return (
            <div className='h-full p-[25px] bg-transparent'>
            {/* Page Title and Filter */}
            <div className='mb-[10px]'>
                <h1 className='text-[45px] font-bold'>Dashboard</h1>
                <button></button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] auto-rows-fr gap-[20px] mb-[15px]">
            {adminStats.map((card, index) => <StatCard key={index} card={ card} />)}
            </div>
        </div>
        )
    }
    const providerView = () => {
        return (
            <div className='h-full p-[25px] bg-transparent'>
                {/* Page Title and Filter */}
                <div className='mb-[10px]'>
                    <h1 className='text-[var(--text-primary)] text-[45px] font-bold'>Dashboard</h1>
                    <button></button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] auto-rows-fr gap-[20px] mb-[15px]">
                    {providerStats.map((card, index) => <StatCard key={index} card={card} />)}
                    {/* <ProfileDropdown/> */}
                </div>
            </div>
        )
    }
    const clientView = () => {
        return (
            <div>Client View</div>
        )
    }

    const view = user.role === ROLES.ADMIN ? adminView() : user.role === ROLES.PROVIDER ? providerView() : clientView();
    return view;
};

export default ClientDashboardPage;