import React from 'react'; 
import { useSelector, useDispatch } from "react-redux";
import CreateEventForm from './CreateEventForm';
import CancelEvent from './CancelEvent';
import RescheduleEvent from './RescheduleEvent';
import AppointmentDetailPopUp from './AppointmentDetailPopUp';
export const FORMS = {
  CREATE_EVENT: "Create Event",
  CANCEL_EVENT: "Cancel Event",
  RESCHEDULE_EVENT: "Reschedule Event",
  APPOINTMENT_DETAIL_POP_UP: "Appointment Detail Pop Up"
}
const FormsContainer = (props) => {
  const currentForm = useSelector((state) => state.ui?.currentForm ?? null);
  const selectedAppointment = useSelector((state)=> state.user?.selectedAppointment ?? null)

  switch (currentForm) {
    case FORMS.CREATE_EVENT:
      return <CreateEventForm />
    case FORMS.RESCHEDULE_EVENT:
      return <RescheduleEvent />
    case FORMS.CANCEL_EVENT:
      return <CancelEvent />
    case FORMS.APPOINTMENT_DETAIL_POP_UP:
      return <AppointmentDetailPopUp appointment={selectedAppointment}/>
    default:
      return null
  }
};

export default FormsContainer;