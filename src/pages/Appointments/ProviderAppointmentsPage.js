import React from 'react';
import Calendar from '../../components/Calendar';

const ProviderAppointmentsPage = (props) => {
  return (
    <div className='h-full flex flex-col items-center pl-[10px] pt-[5px] bg-transparent'>
    {/* Page Title and Filter */}
    <div className='w-full'>
        <h1 className='text-[45px] font-bold'>Appointments</h1>
    </div>
    <div className='w-full flex-1 overflow-y-scroll'>
        {/* Appointment Details */}
        <Calendar/>
    </div>
</div>
  )
};

export default ProviderAppointmentsPage;
