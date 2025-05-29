import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

export default function Dropdown({
  trigger,
  items = [],
  position = 'bottom',
  containerClassName = '',
  itemClassName = '',
  dropdownClassName = '',
  isOpen = false,
  setIsOpen,
}) {
  // Map position prop to Tailwind classes
  const positionClasses = {
    bottom: 'top-full mt-1 left-1/2 transform -translate-x-1/2',
    top: 'bottom-full mb-1 left-1/2 transform -translate-x-1/2',
    left: 'right-full mr-1 top-1/2 transform -translate-y-1/2',
    right: 'left-full ml-1 top-1/2 transform -translate-y-1/2',
  };
  

  const handleOutsideClick = useCallback((e) => {
    if (!e.target.closest('.dropdown-container')) {
      setIsOpen(false);
    }
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle the dropdown state on click
  };

  return (
    <div className={`relative inline-block dropdown-container ${containerClassName}`}>
      {/* Add the onClick handler to the trigger */}
      <div
        onClick={(e) => {
          e.stopPropagation(); // Prevent propagation if needed
          toggleDropdown();
        }}
      >
        {trigger}
      </div>

      {isOpen && (
  <div className={`absolute ${positionClasses[position]} z-50 ${dropdownClassName}`}>
    <div className="flex flex-col items-center shadow-md rounded-md overflow-hidden">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.onClick && item.onClick();
            setIsOpen(false); // Close dropdown after an item is clicked
          }}
          className={`block text-left w-full ${index === 0? "border-t-rounded":""} px-4 py-2 text-sm  ${itemClassName} ${item.className || ''}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
)}
    </div>
  );
}

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
      className: PropTypes.string,
    })
  ),
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  containerClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
