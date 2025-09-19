import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { ARROW_RIGHT } from '../constants';

export default function ProfileDropdown() {
  const avatar = (
    <div className="relative group w-fit flex flex-row items-center p-[5px] rounded cursor-pointer overflow-hidden">
      {/* Ripple Background */}
      <div className="absolute inset-0 bg-gray-200 scale-0 rounded-full opacity-0 group-hover:animate-ripple z-0" />
  
      {/* Content on Top */}
      <div className="relative z-10 flex flex-row items-center">
        <div className="w-[35px] h-[35px] rounded-full bg-[var(--primary)] text-white flex flex-col items-center justify-center">
          A
        </div>
        <div className="mx-2">
          <div className="text-[14px] font-bold">Admin User</div>
          <div className="text-[var(--text-secondary)] text-[12px]">System Admin</div>
        </div>
        <div className="rotate-90">{ARROW_RIGHT}</div>
      </div>
    </div>
  );

  const items = [
    { label: 'Profile', onClick: () => alert('Profile clicked') },
    { label: 'Settings', onClick: () => alert('Settings clicked') },
    { label: 'Logout', onClick: () => alert('Logout clicked'), className: 'text-red-600' },
  ];

  return (
    <Dropdown
      trigger={avatar}
      items={items}
      position="bottom"  // Try changing to "top", "left", "right"
      containerClassName="w-fit h-fit rounded-md"
      itemClassName="text-gray-700 hover:bg-gray-100"
      dropdownClassName="bg-white"
    />
  );
}
