import React from 'react'; 
import { useSelector, useDispatch } from "react-redux";
import CreateEventForm from './CreateEventForm';
import CancelEvent from './CancelEvent';
import RescheduleEvent from './RescheduleEvent';
export const FORMS = {
  CREATE_EVENT: "Create Event",
  CANCEL_EVENT: "Cancel Event",
  RESCHEDULE_EVENT: "Reschedule Event"
}
const FormsContainer = (props) => {
  const currentForm = useSelector((state) => state.ui?.currentForm ?? null);

  switch (currentForm) {
    case FORMS.CREATE_EVENT:
      return <CreateEventForm />
    case FORMS.RESCHEDULE_EVENT:
      return <RescheduleEvent />
    case FORMS.CANCEL_EVENT:
      return <CancelEvent/>
    default:
      return null
  }
};

export default FormsContainer;