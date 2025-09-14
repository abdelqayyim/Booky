import React from 'react'; 
import PopUpFormSkeleton from './PopUpFormSkeleton';
import {
  DOLLAR_SIGN_SVG,
  REPAIR_SVG,
  MAIL_SVG,
  PHONE_SVG,
  CALENDAR_SVG
} from '../../pages/constants';
import { setSelectedUserHistory } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

const ViewCusomterHistory = ({ data }) => {
  const dispatch = useDispatch();
  // Define styles per status
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const fillSection = (icon, key, value, boldKey = false, boldValue = false, isStatus = false) => {
    return (
      <div className='flex flex-row gap-2'>
        {icon && <div className='flex items-center'>{icon}</div>}
        <div className='flex flex-col'>
          <div className={`${boldKey ? 'font-bold' : 'text-[var(--text-secondary)]'} text-md`}>{key}</div>
          <div className='text-md'>
            {isStatus ? (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[value.toLowerCase()] || ''}`}>
                {value}
              </span>
            ) : (
              <span className={`${boldValue ? 'font-bold text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>
                {value}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <PopUpFormSkeleton formTitle="Service" onClose={()=>dispatch(setSelectedUserHistory(undefined))}>
      <div className='flex flex-col gap-4'>

        {/* Grid: Left (Email, Service...) | Right (Phone, Price...) */}
        <div className="grid grid-cols-2 gap-10">
          {/* Left Column */}
          <div className="flex flex-col gap-6 w-fit">
            {fillSection(<div className='text-blue-500'>{MAIL_SVG}</div>, "Email", data?.email, false, true)}
            {fillSection(<div className='text-purple-500'>{REPAIR_SVG}</div>, "Service", data?.service, false, true)}
            {fillSection(<div className='text-orange-500'>{CALENDAR_SVG}</div>, "Date", data?.price ? format(new Date(data.date), "MMM d, yyyy"): "N/A", false, true)}

            {fillSection(null, "Duration", "45 Minutes", false, true)}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {fillSection(<div className='text-green-500'>{PHONE_SVG}</div>, "Phone", data?.phone, false, true)}
            {fillSection(<div className='text-emerald-500'>{DOLLAR_SIGN_SVG}</div>, "Price", data?.price, false, true)}
            {fillSection(null, "Status", "Confirmed", false, false, true)}
            {fillSection(null, "Rating", data?.rating, false, true)}
          </div>
        </div>

        {/* Description */}
        {fillSection(null, "Description", "Complete redesign and development of company website with modern UI/UX, responsive design, and SEO optimization.")}

        {/* Comment */}
        {fillSection(null, "Comment", "Excellent work! The website exceeded our expectations.")}
      </div>
    </PopUpFormSkeleton>
  );
};

export default ViewCusomterHistory;
