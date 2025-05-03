import React from 'react';
import { format, compareAsc, getDaysInMonth } from "date-fns";
import Calendar from '../components/Calendar';

const AppointmentsPage = (props) => {
  const today = format(new Date(), "EEEE MMM d");
  console.log(`today`, today);
  console.log(getDaysInMonth(today));
  return (
    <div className='h-full flex flex-col items-center p-[25px] bg-transparent'>
    {/* Page Title and Filter */}
    <div className='mb-[10px] w-full bg-blue-300'>
        <h1 className='text-[45px] font-bold'>Appointments</h1>
        <button></button>
    </div>
    <div className='w-full flex-1'>
        {/* Appointment Details */}
        <Calendar/>
    </div>

</div>
  )
};

export default AppointmentsPage;