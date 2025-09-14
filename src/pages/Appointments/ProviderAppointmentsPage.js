import React, {useEffect} from 'react';
import Calendar from '../../components/Calendar';
import { getAppointmentsAndSchedules } from '../../redux/user/apiRequests';
import { useDispatch } from 'react-redux';


const ProviderAppointmentsPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppointmentsAndSchedules());
  }, [dispatch]);
  
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
