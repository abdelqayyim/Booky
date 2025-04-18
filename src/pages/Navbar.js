import React from 'react'; 
import { CHECKMARK_SVG, SEARCH_SVG, SEND_SVG } from './constants';

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
        <button className='mr-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] flex flex-row text-white py-[8px] px-[16px] rounded-[8px] border-none font-[500] cursor-pointer items-center gap-[8px] transition-colors duration-200 text-xs'>
          {CHECKMARK_SVG}
          Approve Provider
        </button>
        <button className='bg-transparent hover:bg-[#dde0e4] flex flex-row text-[var(--secondary)] py-[8px] px-[16px] rounded-[8px] border border-[var(--secondary)] font-[500] cursor-pointer items-center gap-[8px] transition-colors duration-200 text-xs'>
          <div>{SEND_SVG}</div>
          Send Notification
        </button>
      </div>
      <div className='flex-1 bg-red-200'>
        New one
      </div>
    </div>
  )
};
export default Navbar;