import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material"; // Burger and close icons
import {
  HOW_IT_WORKS_SVG,
  PRICING_SVG,
  LOGIN_SVG,
  SUPPORT_SVG,
  SINGUP_SVG,
} from "../pages/constants";
const Header = (props) => {
  // State to manage the mobile menu modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Close modal when clicking outside
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Fragment>
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Booky</h1>

          {/* Mobile Burger Icon */}
          <div className="lg:hidden" onClick={toggleModal}>
            {isModalOpen ? <CloseIcon /> : <MenuIcon />}{" "}
            {/* Toggle burger icon to close icon */}
          </div>

          {/* Desktop Navigation (visible only on large screens) */}
          <ul className="hidden lg:flex gap-4">
            <Button variant="contained" className="bg-black-50">
              Sign Up
            </Button>
            <Button variant="contained">Contact</Button>
          </ul>
        </nav>
      </header>

      {/* Mobile Side Modal (Drawer) */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          isModalOpen ? "translate-x-0 " : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Modal Button */}
        <div className="p-4 flex justify-end">
          <CloseIcon className="cursor-pointer" onClick={closeModal} />
        </div>

        {/* Menu Items for mobile sidebar*/}
        <div className="flex flex-col items-center gap-4 p-[10px]">
          <div className="h-[80px] text-2xl font-bold text-left bg-blue-100 w-full rounded-lg p-[5px] flex items-center justify-between">
            <div>How it works</div>
            {/* <div className='bg-black h-[50px] w-[50px] flex items-center justify-center rounded-[50%]'> <NavigationIcon className="text-4xl rotate-90 text-white"/> </div> */}
            {HOW_IT_WORKS_SVG}
          </div>

          <div className="h-[80px] text-2xl font-bold text-left bg-blue-100 w-full rounded-lg p-[5px] flex items-center justify-between">
            <div>Pricing</div>
            {/* <div className='bg-black h-[50px] w-[50px] flex items-center justify-center rounded-[50%]'> <NavigationIcon className="text-4xl rotate-90 text-white"/> </div> */}
            {PRICING_SVG}
          </div>

          <div className="h-[80px] text-2xl font-bold text-left bg-blue-100 w-full rounded-lg p-[5px] flex items-center justify-between">
            <div>Support</div>
            {/* <div className='bg-black h-[50px] w-[50px] flex items-center justify-center rounded-[50%]'> <NavigationIcon className="text-4xl rotate-90 text-white"/> </div> */}
            {SUPPORT_SVG}
          </div>

          <div className="h-[80px] text-2xl font-bold text-left bg-blue-100 w-full rounded-lg p-[5px] flex items-center justify-between">
            <div>Login</div>
            {/* <div className='bg-black h-[50px] w-[50px] flex items-center justify-center rounded-[50%]'> <NavigationIcon className="text-4xl rotate-90 text-white"/> </div> */}
            {LOGIN_SVG}
          </div>

          <div className="h-[80px] text-2xl font-bold text-left bg-blue-100 w-full rounded-lg p-[5px] flex items-center justify-between">
            <div>Signup</div>
            {SINGUP_SVG}
          </div>
        </div>
      </div>

      {/* Overlay behind modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeModal}
        />
      )}
    </Fragment>
  );
};

export default Header;
