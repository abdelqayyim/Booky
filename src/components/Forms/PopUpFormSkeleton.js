import { useSelector, useDispatch } from 'react-redux';
import { setCurrentForm } from '../../redux/ui/uiSlice';
import { FORMS } from './FormsContainer';
import Overlay from '../Overlay';
import { useState } from 'react';

const PopUpFormSkeleton = ({ formTitle, children, onClose }) => {
  const state = useSelector((state) => state.ui);
  const { currentForm, uiMode } = state;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(currentForm !== null);

  const close = () => {
    onClose();
    dispatch(setCurrentForm(null));
    setIsOpen(null);
  };

  return (
    <Overlay isOpen={isOpen} onClose={close}>
      <div className="bg-[var(--component-primary)] p-6 rounded-lg shadow-lg text-[var(--text-primary)] text-base flex flex-col w-full sm:max-w-2xl lg:max-w-5xl min-w-[600px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{formTitle}</h2>
          <button
            onClick={close}
            className="text-2xl h-7 w-7 hover:text-black leading-none rounded-full hover:bg-blue-200 transition-colors"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </Overlay>
  );
};
export default PopUpFormSkeleton;