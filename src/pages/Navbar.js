import React, {useState} from 'react'; 
import { ARROW_RIGHT, BELL_SVG, CALENDAR_SVG, CHECKMARK_SVG, DARK_MODE_SVG, DASHBOARD_SVG, DISPUTES_SVG, MONETIZATION_SVG, NOTIFICATIONS_SVG, REPORTS_SVG, REVIEWS_SVG, SEARCH_SVG, SEND_SVG, SETTINGS_SVG, STOREFRONT_SVG, USERS_SVG } from './constants';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
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
  const mobileSidebarBtns = [
    {
      text: "Send Notification",
      icon: CHECKMARK_SVG,
      backgroundColor: "var(--primary)",
      textColor: "white",
      logo:BELL_SVG , 
      onClick: () => { }
    },
    {
      text: "Approve Provider",
      icon: CHECKMARK_SVG,
      backgroundColor: "var(--success)",
      textColor: "white",
      logo: <SendIcon/>,
      onClick: () => { }
    },
    {
      text: "Dashboard",
      icon: CHECKMARK_SVG,
      backgroundColor: "white",
      logo: DASHBOARD_SVG,
      onClick: () => { }
    },
    {
      text: "Users",
      icon: CHECKMARK_SVG,
      backgroundColor: "white",
      logo: USERS_SVG,
      onClick: () => { }
    },
    {
      text: "Providers",
      icon: CHECKMARK_SVG,
      backgroundColor: "white",
      logo: STOREFRONT_SVG,
      onClick: () => { }
    },
    {
      text: "Appointments",
      icon: CHECKMARK_SVG,
      backgroundColor: "white",
      logo: CALENDAR_SVG,
      onClick: () => { }
    },
    {
      text: "Disputes",
      icon: CHECKMARK_SVG,
      backgroundColor: "white",
      logo: DISPUTES_SVG,
      onClick: () => { }
    },
    {
      text: "Reviews",
      icon: CHECKMARK_SVG,
      backgroundColor: "white",
      logo: REVIEWS_SVG,
      onClick: () => { }
    },
    {
      text: "Notifications",
      icon: CHECKMARK_SVG,
      backgroundColor: "white",
      logo: NOTIFICATIONS_SVG,
      onClick: () => { }
    },
    {
      text: "Monetization",
      icon: CHECKMARK_SVG,
      backgroundColor: "white",
      logo: MONETIZATION_SVG,
      onClick: () => { }
    },
    {
      text: "Reports",
      icon: CHECKMARK_SVG,
      backgroundColor: "white",
      logo: REPORTS_SVG,
      onClick: () => { }
    },
    {
      text: "Settings",
      icon: CHECKMARK_SVG,
      backgroundColor: "white",
      logo: SETTINGS_SVG,
      onClick: () => { }
    },
  ]
  const foldedNarbarBtn = (btn) => {
    return (<div className={`font-bold text-[15px] rounded-md py-2 px-[15px] mx-[10px] flex flex-row items-center`}
      style={{ backgroundColor: btn.backgroundColor, color: btn.textColor ? btn.textColor : "black " }}>
      {btn.logo && btn.logo }
      <div style={{ marginLeft: btn.logo ? "5px" : "0" }}>{btn.text}</div>
    
    </div>)
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
        <div className={`bg-white flex flex-col rounded-r-2xl fixed top-0 left-0 w-64 h-full shadow-lg transform transition-all duration-500 ease-out z-50
                        ${isModalOpen ? 'translate-x-0 opacity-100 shadow-[4px_0_10px_rgba(0,0,0,0.15)]' : '-translate-x-full opacity-0'}`}>
          {/* Close btn */}
          <div className='w-full mt-2 flex flex-row justify-end' onClick={() => { setIsModalOpen(false) }}> <div className="mr-3 bg-[var(--secondary)] text-white w-[40px] h-[40px] flex flex-col items-center justify-center rounded m-0"><CloseIcon /></div> </div>
          <div className='flex-1 my-[10px] overflow-y-scroll flex flex-col gap-[5px]'>{mobileSidebarBtns.map((btn) => foldedNarbarBtn(btn))}</div>
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