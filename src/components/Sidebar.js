import React, { useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { SIDEBAR_ARROW_SVG ,CALENDAR_SVG, DAHSBOARD_SVG, DISPUTES_SVG, MONETIZATION_SVG, NOTIFICATIONS_SVG, REPORTS_SVG, REVIEWS_SVG, SETTINGS_SVG, STOREFRONT_SVG, USERS_SVG } from "../pages/constants";
// import { setCurrentForm, setPageNotFound, FORMS } from "../redux/dataSlice";

const Sidebar = () => {
//   const dispatch = useDispatch();
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
  

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: DAHSBOARD_SVG,
      to: "/",
      onClick: () => {
        // dispatch(setPageNotFound(false));
      },
      },
      {
        label: "Users",
        icon: USERS_SVG,
        to: "/",
        onClick: () => {
          // dispatch(setPageNotFound(false));
        },
      },
      {
        label: "Provides",
        icon: STOREFRONT_SVG,
        to: "/",
        onClick: () => {
          // dispatch(setPageNotFound(false));
        },
      },
      {
        label: "Appointments",
        icon: CALENDAR_SVG,
        to: "/",
        onClick: () => {
          // dispatch(setPageNotFound(false));
        },
      },
      {
        label: "Disputes",
        icon: DISPUTES_SVG,
        to: "/",
        onClick: () => {
          // dispatch(setPageNotFound(false));
        },
      },
      {
        label: "Reviews",
          icon: (<div className="text-white">{ REVIEWS_SVG}</div>),
        to: "/",
        onClick: () => {
          // dispatch(setPageNotFound(false));
        },
      },
      { label: "Notifications", icon:NOTIFICATIONS_SVG, to: "/", onClick: () => {// dispatch(setPageNotFound(false));
},},
      { label: "Monetization", icon: MONETIZATION_SVG, to: "/", onClick: () => {
          // dispatch(setPageNotFound(false));
        },
    },
      {
        label: "Reports",
        icon: REPORTS_SVG,
        to: "/",
        onClick: () => {
          // dispatch(setPageNotFound(false));
        },
      },
    {
      label: "Settings",
      icon:SETTINGS_SVG,
      subItems: [
        {
          label: "Course",
          onClick: (e) => {
            e.preventDefault();
            // dispatch(setCurrentForm(FORMS.CREATE_COURSE));
          },
          },
          {
            label: "Hello World",
            onClick: (e) => {
              e.preventDefault();
              // dispatch(setCurrentForm(FORMS.CREATE_COURSE));
            },
          },
        {
          label: "Note",
          onClick: (e) => {
            e.preventDefault();
            // dispatch(setCurrentForm(FORMS.CREATE_NOTE));
          },
        },
      ],
    },
  ];

  return (
    <nav
      ref={sidebar}
      className="w-16 h-screen bg-[#11121a] border-r border-[#42434a] text-[#e6e6ef] transition-all duration-300 overflow-hidden sticky top-0"
    >
      <ul className="list-none p-2 space-y-2">
        <li className="flex items-center justify-end mb-4">
          <img src="https://via.placeholder.com/32" alt="Logo" className="w-8 h-8" />
          <Tooltip title={sideBarOpen ? "Close" : "Expand"} placement="right">
            <button
              ref={toggleBtn}
              onClick={toggleSideBar}
              className="ml-auto p-2 rounded hover:bg-[#222533]"
            >
              <div className={`transition-transform duration-300 ${sideBarOpen ? "rotate-0" : "rotate-180"}`}>
              {SIDEBAR_ARROW_SVG}
              </div>
            </button>
          </Tooltip>
        </li>

        {sidebarItems.map((item, index) => (
          <li key={index} className="group">
          <Tooltip title={sideBarOpen ? "" : item.label} placement="right">
            <button
              onClick={toggleSubMenu}
              className="flex items-center gap-3 w-full p-3 rounded hover:bg-[#222533] text-left"
            >
              {item.icon}
                <span className={sideBarOpen ? "block flex-grow" : "hidden"}>{item.label}</span>
                {item?.subItems && sideBarOpen && <div> <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" className="transition-transform duration-200 group-[.open]:rotate-180"> <path d="M7 10l5 5 5-5H7z" /></svg> </div>}
            </button>
          </Tooltip>
        
          <ul className="grid grid-rows-[0fr] group-[.open]:grid-rows-[1fr] transition-all duration-300 overflow-hidden">
            <div className="overflow-hidden">
              {item.subItems?.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <a
                    href="#"
                    onClick={subItem.onClick}
                    className="block p-3 pl-10 hover:bg-[#222533] rounded"
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
    </nav>
  );
};

export default Sidebar;
