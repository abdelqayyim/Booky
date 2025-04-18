import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from './Navbar';

const HomePageLayout = (props)=>{
    return (
        <div className='h-screen w-full flex flex-row'>
            {/* Sidebar */}
            <Sidebar/>
            {/* <div className='h-full bg-red-200'>Sidebar</div> */}
            <main className='flex flex-col flex-1 bg-purple-400'>
                {/* NavBar */}
                <Navbar/>
                {/* FormsContainer */}
                <div className='flex-1 overflow-auto'>
                    <Outlet/>
                </div>
            </main>
        </div>
    )
};

export default HomePageLayout;