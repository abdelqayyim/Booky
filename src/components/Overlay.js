import React from 'react';
import { useSelector } from 'react-redux';
import { UIMODES } from '../redux/ui/uiSlice';
const Overlay = ({ isOpen, onClose, children }) => {
  const mode = useSelector((state) => state.ui.uiMode);
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 ${mode === UIMODES.light? 'bg-black bg-opacity-30': 'bg-black bg-opacity-80'} z-40 flex items-center justify-center`}
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