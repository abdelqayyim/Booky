import React from 'react'; 
import { CHECKED_CALENDAR_SVG, METRICS_UP_SVG, ACTIVE_USERS_SVG, STOREFRONT_SVG, DOLLAR_SIGN_SVG } from './constants';

const HomePage = (props) => {
    const stats = [
        {
            title: "Total Bookings",
            logo: CHECKED_CALENDAR_SVG,
            metric: "12.5% from last month",
            color: "#4f46e5",
            backgroundColor: "rgba(79,70,229,0.1)"
        },
        {
            title: "Active Users",
            logo: ACTIVE_USERS_SVG,
            metric: "12.5% from last month",
            color: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)"
        },
        {
            title: "Active Providers",
            logo: STOREFRONT_SVG,
            metric: "12.5% from last month",
            color: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.1)"
        },
        {
            title: "Revenue",
            logo: DOLLAR_SIGN_SVG,
            metric: "12.5% from last month",
            color: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)"
        }
    ]
    const StatCard = ({card}) => {
        return (
            <div className='bg-white sm:w-fit w-[350px] rounded-[10px] p-[20px] shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0px_5px_15px_rgba(0,0,0,0.1)]'>
                    <div className="flex justify-between items-center mb-[15px]">
                        <div className='text-[var(--secondary)] text-[14px] font-semibold'>
                            { card.title}
                        </div>
                        <div className="flex flex-col items-center justify-center rounded text-[var(--primary)] w-[40px] h-[40px]" style={{color: card.color, backgroundColor: card.backgroundColor}}>
                            {card.logo}
                        </div>
                    </div>
                    <div className='text-[24px] font-bold mb-[5px]'>8,492</div>
                    <div className='text-[var(--success)] flex flex-row gap-[2px] text-sm items-center'>
                        <div>{METRICS_UP_SVG}</div><span>{ card.metric}</span>
                    </div>
                </div>
        )
    }
    return (
        <div className='h-full p-[25px] bg-transparent'>
            {/* Page Title and Filter */}
            <div className='mb-[10px]'>
                <h1 className='text-[45px] font-bold'>Dashboard</h1>
                <button></button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-[20px] mb-[15px] justify-items-center">
                {stats.map((card) => <StatCard card={ card} />)}
            </div>
        </div>
    )
};

export default HomePage;