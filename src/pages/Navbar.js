import React from 'react'; 
import { ARROW_RIGHT, BELL_SVG, CHECKMARK_SVG, DARK_MODE_SVG, SEARCH_SVG, SEND_SVG } from './constants';

const Navbar = (props) => {
  const SearchBar = () => {
    return (
      <div className='w-[300px] flex flex-row items-center px-2 bg-[var(--light)] rounded mr-4'>
        <div className='mr-1 text-[var(--secondary)]'>{SEARCH_SVG}</div>
        <input className='text-[var(--dark)] bg-transparent border-none p-[5px] w-full outline-none' placeholder='Search for users or providers...'/>
      </div>
    )
  }
  return (
    <div className='bg-white w-full h-[50px] px-[25px] py-[5px] flex flex-row'>
      <div className='flex flex-row'>
        <SearchBar /> 
        <button className='mr-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] flex flex-row text-white px-[10px] rounded-[8px] border-none font-[500] cursor-pointer items-center gap-[8px] transition-colors duration-200 text-xs'>
          {CHECKMARK_SVG}
          Approve Provider
        </button>
        <button className='bg-transparent hover:bg-[#dde0e4] flex flex-row text-[var(--secondary)] px-[10px] rounded-[8px] border border-[var(--secondary)] font-[500] cursor-pointer items-center gap-[8px] transition-colors duration-200 text-xs'>
          <div>{SEND_SVG}</div>
          Send Notification
        </button>
      </div>
      <div className='flex-1 flex flex-row justify-end'>
        <div className='w-fit p-2 mr-2  hover:cursor-pointer'>{DARK_MODE_SVG}</div>
        <div className='w-fit p-2 mr-2  hover:cursor-pointer'>{BELL_SVG}</div>
        <div className='w-fit flex flex-row items-center p-[5px] rounded hover:bg-gray-200 hover:cursor-pointer'>
          <div className='w-[35px] h-[35px] rounded-full bg-[var(--primary)] text-white flex flex-col items-center justify-center'>A</div>
          <div className='mx-2'>
            <div className='text-[14px] font-bold'>Admin User</div>
            <div className='text-[var(--secondary)] text-[12px]'>System Admin</div>
          </div>
          <div className='rotate-90'>{ ARROW_RIGHT}</div>
        </div>
      </div>
    </div>
  )
};
export default Navbar;