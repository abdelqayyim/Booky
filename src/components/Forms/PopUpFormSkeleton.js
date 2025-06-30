import { useSelector, useDispatch } from 'react-redux';
import { setCurrentForm } from '../../redux/ui/uiSlice';
import { FORMS } from './FormsContainer';
import Overlay from '../Overlay';
import { useState } from 'react';

const PopUpFormSkeleton = ({formTitle, children }) => {
  const currentForm = useSelector(state => state.ui.currentForm);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(currentForm !== null);

  const close = () => {
    dispatch(setCurrentForm(null));
    setIsOpen(null);
  };

  return (
    <Overlay isOpen={isOpen} onClose={close}>
  <div className="bg-white p-6 rounded-lg shadow-lg text-black text-base flex flex-col w-full max-w-md">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">{formTitle}</h2>
      <button
        onClick={close}
        className="text-2xl h-7 w-7 leading-none rounded-full hover:bg-blue-200 transition-colors"
      >
        &times;
      </button>
    </div>
    <div>{children}</div>
  </div>
</Overlay>

  );
};
export default PopUpFormSkeleton;