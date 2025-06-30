import React from 'react'; 
import PopUpFormSkeleton from './PopUpFormSkeleton';

const CancelEvent = (props)=>{
  return (
    <PopUpFormSkeleton formTitle={"Cancel Event"}>
        <div>Hello world</div>
      </PopUpFormSkeleton>
  )
};

export default CancelEvent;