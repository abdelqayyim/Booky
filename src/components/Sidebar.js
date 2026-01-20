import React, { useState, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  SIDEBAR_ARROW_SVG,
  CALENDAR_SVG,
  DASHBOARD_SVG,
  DISPUTES_SVG,
  REPORTS_SVG,
  SETTINGS_SVG,
  USERS_SVG,
  LOGOUT_SVG,
} from "../constants";
import ThemeToggle from "./ThemeToggle";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES } from "../redux/user/userSlice";

const Sidebar = () => {
  const userRole = useSelector((state) => state.user?.user?.role ?? null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.replace(/^\//, ""); // remove leading slash

  const sidebarRef = useRef();
  const toggleBtnRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    const side = sidebarRef.current;
    if (isOpen) {
      side.querySelectorAll("li.open").forEach((li) => li.classList.remove("open"));
    }
    setIsOpen((prev) => !prev);
    side.classList.toggle("w-60");
    side.classList.toggle("w-16");
  };

  const toggleSubMenu = (e) => {
    e.currentTarget.closest("li").classList.toggle("open");
    if (!isOpen) toggleSidebar();
  };

  const sidebarItemsByRole = {
    [ROLES.PROVIDER]: [
      { label: "Dashboard", icon: DASHBOARD_SVG, onClick: () => navigate("/dashboard") },
      { label: "Appointments", icon: CALENDAR_SVG, onClick: () => navigate("/appointments") },
      { label: "Clients", icon: USERS_SVG, onClick: () => navigate("/users") },
      { label: "Disputes", icon: DISPUTES_SVG, onClick: () => navigate("/disputes") },
      { label: "Settings", icon: SETTINGS_SVG, onClick: () => navigate("/settings") },
    ],
    [ROLES.CLIENT]: [
      { label: "Dashboard", icon: DASHBOARD_SVG, onClick: () => navigate("/dashboard") },
      { label: "Appointments", icon: CALENDAR_SVG, onClick: () => navigate("/appointments") },
      { label: "Disputes", icon: DISPUTES_SVG, onClick: () => navigate("/disputes") },
      { label: "Reports", icon: REPORTS_SVG, onClick: () => navigate("/reports") },
    ],
  };

  const sidebarItems = sidebarItemsByRole[userRole] || [];

  const renderSidebarButton = (item) => (
    <li key={item.label} className="group">
      <Tooltip title={isOpen ? "" : item.label} placement="right">
        <button
          onClick={(e) => {
            if (!item.subItems?.length) {
              item.onClick?.();
              if (isOpen) toggleSidebar();
            } else toggleSubMenu(e);
          }}
          className={`flex items-center justify-center gap-3 w-full p-2 rounded hover:bg-[var(--primary-20)] text-left
            ${currentPath === item.label.toLowerCase() ? "bg-[var(--primary-20)] font-bold text-[var(--primary)]" : ""}`}
        >
          {item.icon}
          <span className={isOpen ? "block flex-grow" : "hidden"}>{item.label}</span>
          {item.subItems?.length && isOpen && (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor"
              className="transition-transform duration-200 group-[.open]:rotate-180">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          )}
        </button>
      </Tooltip>

      {item.subItems?.length > 0 && (
        <ul className="grid grid-rows-[0fr] group-[.open]:grid-rows-[1fr] transition-all duration-300 overflow-hidden">
          {item.subItems.map((sub) => (
            <li key={sub.label}>
              <a
                href="#"
                onClick={(e) => { sub.onClick(e); toggleSidebar(); }}
                className="block p-2 pl-10 hover:bg-[var(--primary-20)] rounded"
              >
                {sub.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <nav
      ref={sidebarRef}
      className={`hidden md:block ${isOpen ? "md:min-w-[200px]" : "md:min-w-[70px] md:max-w-[70px]"}
        h-full bg-[var(--bg-primary)] border-r border-r-[var(--primary-20)] md:flex md:flex-col
        transition-all duration-300 sticky top-0 overflow-y-auto hide-scrollbar`}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Top: Logo + items */}
        <ul className="list-none p-2 space-y-2">
          <li className="flex items-center justify-end mb-4">
            <img src="https://via.placeholder.com/32" alt="Logo" className="w-8 h-8" />
            <Tooltip title={isOpen ? "Close" : "Expand"} placement="right">
              <button ref={toggleBtnRef} onClick={toggleSidebar} className="ml-auto p-3 rounded hover:bg-[red-50]">
                <div className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}>
                  {SIDEBAR_ARROW_SVG}
                </div>
              </button>
            </Tooltip>
          </li>

          {sidebarItems.map(renderSidebarButton)}
        </ul>

        {/* Bottom: ThemeToggle + Logout */}
        <div className="p-2 flex flex-col gap-2">
          <ThemeToggle showLabel={isOpen} />

          <Tooltip title={isOpen ? "" : "Logout"} placement="right">
            <button
              onClick={() => console.log("Logout clicked")} // replace with logout logic
              className="flex items-center justify-center gap-3 w-full p-2 rounded hover:bg-[var(--primary-20)] text-left"
            >
              {LOGOUT_SVG}
              <span className={isOpen ? "block flex-grow font-semibold" : "hidden"}>Logout</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
