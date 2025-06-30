import React, {Fragment} from 'react';
const Overlay = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Prevent modal clicks from closing it */}
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;