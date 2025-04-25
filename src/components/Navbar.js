import React, { useState } from "react";
import {
  ARROW_RIGHT,
  BELL_SVG,
  CALENDAR_SVG,
  CHECKMARK_SVG,
  DARK_MODE_SVG,
  DASHBOARD_SVG,
  DISPUTES_SVG,
  MONETIZATION_SVG,
  NOTIFICATIONS_SVG,
  REPORTS_SVG,
  REVIEWS_SVG,
  SETTINGS_SVG,
  STOREFRONT_SVG,
  USERS_SVG,
} from "../pages/constants";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import Overlay from "./Overlay";
import SearchBar from "./Searchbar";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mobileSidebarBtns = [
    {
      text: "Send Notification",
      icon: CHECKMARK_SVG,
      backgroundColor: "var(--primary)",
      textColor: "white",
      logo: BELL_SVG,
      onClick: () => navigate('/dashboard'),
    },
    {
      text: "Approve Provider",
      icon: CHECKMARK_SVG,
      backgroundColor: "var(--success)",
      textColor: "white",
      logo: <SendIcon />,
      onClick: () => navigate('/providers'),
    },
    {
      text: "Dashboard",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "white",
      logo: DASHBOARD_SVG,
      onClick: () => navigate('/dashboard'),
    },
    {
      text: "Users",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "white",
      logo: USERS_SVG,
      onClick: () => navigate('/users'),
    },
    {
      text: "Providers",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "white",
      logo: STOREFRONT_SVG,
      onClick: () => navigate('/providers'),
    },
    {
      text: "Appointments",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "white",
      logo: CALENDAR_SVG,
      onClick: () => navigate('/appointments'),
    },
    {
      text: "Disputes",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "white",
      logo: DISPUTES_SVG,
      onClick: () => navigate('/disputes'),
    },
    {
      text: "Reviews",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "white",
      logo: REVIEWS_SVG,
      onClick: () => navigate('/reviews'),
    },
    {
      text: "Notifications",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "white",
      logo: NOTIFICATIONS_SVG,
      onClick: () => navigate('/notifications'),
    },
    {
      text: "Monetization",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "white",
      logo: MONETIZATION_SVG,
      onClick: () => navigate('/monetization'),
    },
    {
      text: "Reports",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "white",
      logo: REPORTS_SVG,
      onClick: () => navigate('/reports'),
    },
    {
      text: "Settings",
      icon: CHECKMARK_SVG,
      backgroundColor: "transparent",
      textColor: "white",
      logo: SETTINGS_SVG,
      onClick: () => navigate('/dashboard'),
    },
  ];
  const foldedNarbarBtn = (btn) => {
    return (
      <div
        className={`font-bold text-[15px] rounded-md py-2 px-[15px] mx-[10px] flex flex-row items-center`}
        style={{
          backgroundColor: btn.backgroundColor,
          color: btn.textColor ? btn.textColor : "black ",
        }}
        onClick={() => { btn.onClick();  setIsModalOpen((prev) => !prev);}
}
      >
        {btn.logo && btn.logo}
        <div style={{ marginLeft: btn.logo ? "5px" : "0" }}>{btn.text}</div>
      </div>
    );
  };
  return (
    <div className="bg-white w-full h-[50px] px-0 py-0 md:px-[25px] md:py-[5px] flex flex-row overflow-x-hidden">
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
    {mobileSidebarBtns.map((btn) => foldedNarbarBtn(btn))}
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
        {/* For larger screen view */}
        <div className="flex flex-row h-full">
          <button
            className="mr-4 bg-[var(--primary)] hover:bg-[var(--primary-hover)] flex flex-row 
                          text-white px-[10px] rounded-[8px] border-none font-[500] cursor-pointer
                          items-center gap-[8px] transition-colors duration-200 text-xs"
          >
            {CHECKMARK_SVG}
            Approve Provider
          </button>
          <button
            className="bg-transparent hover:bg-[#dde0e4] flex flex-row text-[var(--secondary)] 
                            px-[10px] rounded-[8px] border border-[var(--secondary)] font-[500] cursor-pointer
                            items-center gap-[8px] transition-colors duration-200 text-xs"
          >
            <div>
              <SendIcon />
            </div>
            Send Notification
          </button>
        </div>

        <div className="flex-1 flex flex-row justify-end">
        <div
          className="relative flex flex-col items-center justify-center p-2 mr-2 h-[50px] w-[50px] rounded-full overflow-hidden group"
          onClick={() => navigate("/notifications")}
        >
          <div className="absolute inset-0 bg-gray-200 scale-0 rounded-full opacity-0 group-hover:animate-ripple z-0 cursor-pointer" />
          <div className="z-10 cursor-pointer">{BELL_SVG}</div>
        </div>
          <div className="w-fit flex flex-row items-center p-[5px] rounded hover:bg-gray-200 hover:cursor-pointer">
            <div className="w-[35px] h-[35px] rounded-full bg-[var(--primary)] text-white flex flex-col items-center justify-center">
              A
            </div>
            <div className="mx-2">
              <div className="text-[14px] font-bold">Admin User</div>
              <div className="text-[var(--secondary)] text-[12px]">
                System Admin
              </div>
            </div>
            <div className="rotate-90">{ARROW_RIGHT}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
