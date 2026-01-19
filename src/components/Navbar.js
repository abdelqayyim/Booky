import React, { useState } from "react";
import {
  BELL_SVG,
  CALENDAR_SVG,
  CHECKMARK_SVG,
  DASHBOARD_SVG,
  DISPUTES_SVG,
  MONETIZATION_SVG,
  REPORTS_SVG,
  REVIEWS_SVG,
  SETTINGS_SVG,
  STOREFRONT_SVG,
  USERS_SVG,
} from "../constants";
import NotificationBell from "./NotificationBell";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import Overlay from "./Overlay";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from "./ProfileDropdown";
const Navbar = (props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mobileSidebarBtns = [
    {
      text: "Send Notification",
      icon: CHECKMARK_SVG,
      backgroundColor: "var(--primary)",
      textColor: "var(--text-opposite-primary)",
      logo: BELL_SVG,
      onClick: () => navigate('/dashboard'),
    },
    {
      text: "Approve Provider",
      icon: CHECKMARK_SVG,
      backgroundColor: "var(--success)",
      textColor: "var(--text-opposite-primary)",
      logo: <SendIcon />,
      onClick: () => navigate('/providers'),
    },
    {
      text: "Dashboard",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "var(--text-opposite-primary)",
      logo: DASHBOARD_SVG,
      onClick: () => navigate('/dashboard'),
    },
    {
      text: "Users",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "var(--text-opposite-primary)",
      logo: USERS_SVG,
      onClick: () => navigate('/users'),
    },
    {
      text: "Providers",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "var(--text-opposite-primary)",
      logo: STOREFRONT_SVG,
      onClick: () => navigate('/providers'),
    },
    {
      text: "Appointments",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "var(--text-opposite-primary)",
      logo: CALENDAR_SVG,
      onClick: () => navigate('/appointments'),
    },
    {
      text: "Disputes",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "var(--text-opposite-primary)",
      logo: DISPUTES_SVG,
      onClick: () => navigate('/disputes'),
    },
    {
      text: "Reviews",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "var(--text-opposite-primary)",
      logo: REVIEWS_SVG,
      onClick: () => navigate('/reviews'),
    },
    {
      text: "Notifications",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "var(--text-opposite-primary)",
      logo: <NotificationBell count={3} bg={"var(--text-opposite-primary)" } />,
      onClick: () => navigate('/notifications'),
    },
    {
      text: "Monetization",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "var(--text-opposite-primary)",
      logo: MONETIZATION_SVG,
      onClick: () => navigate('/monetization'),
    },
    {
      text: "Reports",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "var(--text-opposite-primary)",
      logo: REPORTS_SVG,
      onClick: () => navigate('/reports'),
    },
    {
      text: "Settings",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "var(--text-opposite-primary)",
      logo: SETTINGS_SVG,
      onClick: () => navigate('/dashboard'),
    },
  ];
  
  const foldedNarbarBtn = (btn, key) => {
    return (
      <div
        className={`font-bold text-[15px] rounded-md py-2 px-[15px] mx-[10px] flex flex-row items-center`}
        style={{
          backgroundColor: btn.backgroundColor,
          color: btn.textColor ? btn.textColor : "black ",
        }}
        key={key}
        onClick={() => { btn.onClick();  setIsModalOpen((prev) => !prev);}
}
      >
        {btn.logo && btn.logo}
        <div style={{ marginLeft: btn.logo ? "5px" : "0" }}>{btn.text}</div>
      </div>
    );
  };
  return (
<div className="bg-[var(--bg-primary)] border-b border-b-[var(--primary-20)] w-full h-[50px] px-0 py-0 md:px-[25px] md:py-[5px] flex flex-row rounded-t">
<input
  className="
    w-[200px]
    pl-10 pr-4 py-2
    text-[var(--text-primary)]
    bg-[var(--bg-secondary)]
    rounded-lg
    text-sm
    border border-transparent
    focus:outline-none focus:ring-1 focus:ring-[rgba(var(--primary-rgb),0.2)] focus:border-[rgba(var(--primary-rgb),0.2)]
    placeholder:text-gray-600
  "
  placeholder="Search bookings, customers..."
  type="text"
/>      
      <div className="flex flex-row items-center justify-between md:hidden w-full z-50 relative">
        {/* For Mobile View */}
        <div
          className="h-full w-[50px] mr-[5px] flex flex-col items-center justify-center"
          onClick={() => {
            setIsModalOpen((prev) => !prev);
          }}
        >
          <MenuIcon />
        </div>
        {!isModalOpen && <div className="text-bold">Booky </div>}
        {!isModalOpen && (
          <div className="w-[35px] h-[35px] rounded-full bg-[var(--primary)] text-white flex flex-col items-center justify-center mr-[10px]">
            A
          </div>
        )}

        {/* Menu Drop Down */}
        {/* Dropdown Overlay */}
        <Overlay isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div
            className={`bg-[var(--dark)] flex flex-col rounded-r-2xl fixed top-0 left-0 w-64 h-full shadow-lg transform transition-all duration-500 ease-out z-50
                          ${
                            isModalOpen
                              ? "translate-x-0 opacity-100 shadow-[4px_0_10px_rgba(0,0,0,0.15)]"
                              : "-translate-x-full opacity-0"
                          } justify-between`}
          >
            <div className="flex flex-col h-full">
  {/* Close btn */}
  <div className="w-full mt-2 flex flex-row justify-end" onClick={() => setIsModalOpen(false)}>
    <div className="mr-3 bg-[var(--secondary)] text-white w-[40px] h-[40px] flex flex-col items-center justify-center rounded m-0">
      <CloseIcon />
    </div>
  </div>

  {/* Scrollable button list */}
  <div className="flex-1 my-[10px] overflow-y-auto flex flex-col gap-[5px] px-3">
    {mobileSidebarBtns.map((btn, key) => foldedNarbarBtn(btn,key))}
  </div>

  {/* Theme toggle fixed at bottom */}
  <div className="p-3 border-t border-gray-700">
    <ThemeToggle showLabel={true} />
  </div>
</div>
          </div>
        </Overlay>
      </div>

      <div className="hidden md:flex flex-1 flex-row justify-between items-center">

        <div className="flex-1 flex flex-row justify-end">
        <div
          className="relative flex flex-col items-center justify-center p-2 mr-2 h-[50px] w-[50px] rounded-full overflow-hidden group"
          onClick={() => navigate("/notifications")}
        >
          <div className="absolute inset-0 bg-gray-200 scale-0 rounded-full opacity-0 group-hover:animate-ripple z-0 cursor-pointer" />
            <NotificationBell count={ 3} bg={"var(--text-primary)" } />
          </div>
          
          <ProfileDropdown />
          
        </div>
      </div>
    </div>
  );
};
export default Navbar;
