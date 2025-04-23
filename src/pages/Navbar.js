import React, {useState} from 'react'; 
import { ARROW_RIGHT, BELL_SVG, CHECKMARK_SVG, DARK_MODE_SVG, HAMBURGER_MENU_SVG, SEARCH_SVG, SEND_SVG } from './constants';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'; 
const Navbar = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const SearchBar = () => {
    return (
      <div className='md:flex md:w-[300px] lg:w-[300px] flex-row items-center px-2 bg-[var(--light)] rounded md:mr-4 lg:mr-4'>
        <div className='mr-1 text-[var(--secondary)]'>{SEARCH_SVG}</div>
        <input className='text-[var(--dark)] bg-transparent border-none p-[5px] w-full outline-none' placeholder='Search for users or providers...'/>
      </div>
    )
  }
  return (
    <div className='bg-white w-full h-[50px] px-0 py-0 md:px-[25px] md:py-[5px] flex flex-row overflow-x-hidden'>
      <div className='flex flex-row items-center justify-between md:hidden w-full z-50 relative'>
          {/* For Mobile View */}
          <div className='h-full w-[50px] mr-[5px] flex flex-col items-center justify-center' onClick={()=>{setIsModalOpen(prev=>!prev)}}>
          <MenuIcon />
        </div>
        {!isModalOpen && <div className='text-bold'>Booky </div>}
        {!isModalOpen && <div className='w-[35px] h-[35px] rounded-full bg-[var(--primary)] text-white flex flex-col items-center justify-center'>A</div>
        }
        
        {/* Menu Drop Down */}
         {/* Dropdown Overlay */}
         <div className={`bg-red-200 fixed top-0 left-0 w-64 h-full shadow-lg transform ${isModalOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
         <div className='w-full bg-gray-300 flex flex-row justify-end px-[5px]' onClick={()=>{setIsModalOpen(false)}}><CloseIcon/></div>
</div>

      </div>
      

      <div className='hidden md:flex flex-1 flex-row justify-between items-center'>
        {/* For larger screen view */}
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
      
    </div>
  )
};
export default Navbar;