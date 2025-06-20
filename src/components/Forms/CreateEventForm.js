import React from 'react'; 
import Overlay from '../Overlay';

const CreateEventForm = () => {
  return (
    <Overlay isOpen={true}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg text-black text-lg">
          HELLOP WORLD
        </div>
      </div>
    </Overlay>
  );
};


export default CreateEventForm;