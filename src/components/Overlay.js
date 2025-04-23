import React, {Fragment} from 'react';
const Overlay = ({ isOpen, onClose, children }) => {
  return (
    <Fragment>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        />
      )}
      {children}
    </Fragment>
  );
};
export default Overlay;