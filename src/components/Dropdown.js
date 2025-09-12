import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";

export default function Dropdown({
  trigger,
  items = [],
  position = "bottom",
  containerClassName = "",
  itemClassName = "",
  dropdownClassName = "",
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  footer,
}) {
  // Local state if no controlled props
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use controlled state if provided, else use internal
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen =
    controlledSetIsOpen !== undefined ? controlledSetIsOpen : setInternalIsOpen;

  // Map position prop to Tailwind classes
  const positionClasses = {
    bottom: "top-full mt-1 left-1/2 transform -translate-x-1/2",
    top: "bottom-full mb-1 left-1/2 transform -translate-x-1/2",
    left: "right-full mr-1 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-1 top-1/2 transform -translate-y-1/2",
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`relative inline-block dropdown-container ${containerClassName}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute ${positionClasses[position]} z-50 ${dropdownClassName}`}
        >
          <div className="flex flex-col items-center shadow-md rounded-md overflow-hidden">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={(e) => {
                  item.onClick && item.onClick(e);
                  if (!item.keepOpen) setIsOpen(false);
                }}
                className={`block text-left w-full px-4 py-2 text-sm ${itemClassName} ${
                  item.className || ""
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* ✅ Footer goes here */}
            {footer && (
              <div className="w-full px-4 py-3 border-t border-gray-200 flex justify-between items-center gap-2 bg-white">
                {footer}
              </div>
            )}
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
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  containerClassName: PropTypes.string,
  itemClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  isOpen: PropTypes.bool, // now optional
  setIsOpen: PropTypes.func, // now optional
};
