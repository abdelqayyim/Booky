import React, { useState, useRef, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { SIDEBAR_ARROW_SVG ,CALENDAR_SVG, DASHBOARD_SVG, DISPUTES_SVG, MONETIZATION_SVG, REPORTS_SVG, REVIEWS_SVG, SETTINGS_SVG, STOREFRONT_SVG, USERS_SVG } from "../pages/constants";
import ThemeToggle from "./ThemeToggle";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NotificationBell from "./NotificationBell";
import { useSelector } from "react-redux";
import { ROLES } from "../redux/user/userSlice";

const Sidebar = () => {
  const userRole = useSelector((state)=>state.user?.user?.role ?? null)
    const navigate = useNavigate();
  const location = useLocation();
   // Remove the leading slash
   const currentPath = location.pathname.startsWith('/')
   ? location.pathname.slice(1)
     : location.pathname;
  
 
  const sidebar = useRef();
  const toggleBtn = useRef();
  const [sideBarOpen, setSidebarOpen] = useState(false);

  const toggleSubMenu = (e) => {
    const button = e.currentTarget;
    const parentLi = button.closest("li");
  
    parentLi.classList.toggle("open"); // <- toggle custom class
  
    if (!sideBarOpen) toggleSideBar();
  };

  const toggleSideBar = () => {
    const side = sidebar.current;
    
    // If the sidebar is currently open and is now closing
    if (sideBarOpen) {
      Array.from(side.querySelectorAll("li.open")).forEach((li) => {
        li.classList.remove("open");
      });
    }
  
    setSidebarOpen((prev) => !prev);
  
    side.classList.toggle("w-60");
    side.classList.toggle("w-16");
  };
  

  const providerSidebarItems = [
    { label: "Dashboard", icon: DASHBOARD_SVG, to: "/", onClick: () => navigate('/dashboard'), },
    // { label: "Notifications", icon: <NotificationBell count={3}/>, to: "/", onClick: () => navigate('/notifications') },
    { label: "Appointments", icon: CALENDAR_SVG, to: "/", onClick: () => navigate('/appointments')},
    { label: "Users", icon: USERS_SVG, to: "/", onClick: () => navigate('/users')},
    { label: "Providers", icon: STOREFRONT_SVG, to: "/", onClick: () => navigate('/providers')},
    { label: "Disputes", icon: DISPUTES_SVG, to: "/", onClick: () => navigate('/disputes')},
    { label: "Reviews", icon:REVIEWS_SVG, to: "/", onClick: () => navigate('/reviews')},
    { label: "Monetization", icon: MONETIZATION_SVG, to: "/", onClick: () => navigate('/monetization')},
    {label: "Reports", icon: REPORTS_SVG, to: "/", onClick: () => navigate('/reports')},
    // { label: "Settings", icon:SETTINGS_SVG, subItems: [
    //     {
    //       label: "Course",
    //       onClick: (e) => {
    //         e.preventDefault();
    //         // dispatch(setCurrentForm(FORMS.CREATE_COURSE));
    //       },
    //       },
    //       {
    //         label: "Hello World",
    //         onClick: (e) => {
    //           e.preventDefault();
    //           // dispatch(setCurrentForm(FORMS.CREATE_COURSE));
    //         },
    //       },
    //     {
    //       label: "Note",
    //       onClick: (e) => {
    //         e.preventDefault();
    //         // dispatch(setCurrentForm(FORMS.CREATE_NOTE));
    //       },
    //   },
    //   ],
    // },
  ];

  const clientSidebarItems = [
    { label: "Dashboard", icon: DASHBOARD_SVG, to: "/", onClick: () => navigate('/dashboard'), },
    // { label: "Notifications", icon: <NotificationBell count={3}/>, to: "/", onClick: () => navigate('/notifications') },
    { label: "Appointments", icon: CALENDAR_SVG, to: "/", onClick: () => navigate('/appointments')},
    { label: "Disputes", icon: DISPUTES_SVG, to: "/", onClick: () => navigate('/disputes')},
    {label: "Reports", icon: REPORTS_SVG, to: "/", onClick: () => navigate('/reports')},
  ];

  const getSidebarItems = () => {
    switch (userRole) {
      case ROLES.PROVIDER:
        return providerSidebarItems;
        break;
      case ROLES.CLIENT:
        return clientSidebarItems;
      default:
        return []
        break;
    }
  }


  return (
    <nav
  ref={sidebar}
  className={`hidden md:block mr-[5px] ${sideBarOpen ? "md:min-w-[200px]" : "md:min-w-[70px] md:max-w-[70px]"} 
      rounded h-full bg-[var(--component-primary)] border-r border-none md:flex md:flex-col
      transition-all duration-300 sticky top-0 overflow-y-auto hide-scrollbar`}
>
  <div className="flex flex-col justify-between h-full">
    {/* Bigger Screens */}
    {/* Top section with logo and items */}
    <ul className="list-none p-2 space-y-2">
      <li className="flex items-center justify-end mb-4">
        <img src="https://via.placeholder.com/32" alt="Logo" className="w-8 h-8" />
        <Tooltip title={sideBarOpen ? "Close" : "Expand"} placement="right">
          <button
            ref={toggleBtn}
            onClick={toggleSideBar}
            className="ml-auto p-3 rounded hover:bg-[var(--primary-hover)]"
          >
            <div className={`transition-transform duration-300 ${sideBarOpen ? "rotate-0" : "rotate-180"}`}>
              {SIDEBAR_ARROW_SVG}
            </div>
          </button>
        </Tooltip>
      </li>

      {getSidebarItems().map((item, index) => (
          <li key={index} className="group">
          <Tooltip title={sideBarOpen ? "" : item.label} placement="right">
            <button
              onClick={(event) => {
                if (!item.subItems || item.subItems.length === 0) {
                  // If there are no sub items then do no expand sidebar
                  item.onClick?.();
                  if (sideBarOpen) {
                    toggleSideBar()
                  }
                } else {
                  toggleSubMenu(event);
                }
              }}
              className={`flex items-center justify-center gap-3 w-full p-2 rounded hover:bg-[var(--primary-hover)] text-left ${currentPath === item.label.toLowerCase()? "bg-[var(--primary)] text-white":""}`}
            >
              {item.icon}
                <span className={sideBarOpen ? "block flex-grow" : "hidden"}>{item.label}</span>
                {item?.subItems && sideBarOpen && <div> <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" className="transition-transform duration-200 group-[.open]:rotate-180"> <path d="M7 10l5 5 5-5H7z" /></svg> </div>}
            </button>
          </Tooltip>
        
          <ul className="grid grid-rows-[0fr] group-[.open]:grid-rows-[1fr] transition-all duration-300">
            <div className="overflow-hidden">
              {item.subItems?.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <a
                    href="#"
                    onClick={(event) => { subItem.onClick(event); toggleSideBar() }}
                    className="block p-2 pl-10 hover:bg-[var(--primary)] rounded"
                  >
                    {subItem.label}
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </li>
        
        ))}
    </ul>

    {/* Bottom section for ThemeToggle */}
    <div className="p-2">
      <ThemeToggle showLabel={sideBarOpen} />
    </div>

  </div>
</nav>

  );
};

export default Sidebar;
