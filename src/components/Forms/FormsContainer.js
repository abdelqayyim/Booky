import React from 'react'; 
import { useSelector, useDispatch } from "react-redux";
import CreateEventForm from './CreateEventForm';
export const FORMS = {
  CREATE_EVENT: "Create Event"
}
const FormsContainer = (props) => {
  const currentForm = useSelector((state) => state.ui?.currentForm ?? null);

  console.log(`currentForm`,currentForm);

  switch (currentForm) {
    case FORMS.CREATE_EVENT:
      return <CreateEventForm/>
    default:
      return null
  }
};

export default FormsContainer;