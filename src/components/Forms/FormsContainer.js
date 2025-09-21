import React from 'react'; 
import { useSelector, useDispatch } from "react-redux";
import CreateEventForm from './CreateEventForm';
import CancelEvent from './CancelEvent';
import RescheduleEvent from './RescheduleEvent';
import AppointmentDetailPopUp from './AppointmentDetailPopUp';
import ViewCusomterHistory from './ViewCusomterHistory';
import ViewSuscribedCustomer from './ViewSuscribedCustomer';
import DisputeDetail from './DisputeDetail';
export const FORMS = {
  CREATE_EVENT: "Create Event",
  CANCEL_EVENT: "Cancel Event",
  RESCHEDULE_EVENT: "Reschedule Event",
  APPOINTMENT_DETAIL_POP_UP: "Appointment Detail Pop Up",
  DISPUTE_MANAGEMENT: "Dispute Management",

  VIEW_SERVICE_HISTORY: "View Service History",
  VIEW_SUBSCRIBED_USER: "View Subscribed User"
}
const FormsContainer = (props) => {
  const currentForm = useSelector((state) => state.ui?.currentForm ?? null);
  const selectedAppointment = useSelector((state) => state.user?.selectedAppointment ?? null)
  const userHistoryData = useSelector((state) => state.user?.selectedUserHistory);
  const subscribedUserData = useSelector((state) => state.user?.selectedUserSubscribed);
  const selectedDispute = useSelector((state) => state.user?.selectedDispute);

  switch (currentForm) {
    case FORMS.CREATE_EVENT:
      return <CreateEventForm />
    case FORMS.RESCHEDULE_EVENT:
      return <RescheduleEvent />
    case FORMS.CANCEL_EVENT:
      return <CancelEvent />
    case FORMS.APPOINTMENT_DETAIL_POP_UP:
      return <AppointmentDetailPopUp appointment={selectedAppointment} />
    case FORMS.VIEW_SERVICE_HISTORY:
      return <ViewCusomterHistory data={userHistoryData} />
    case FORMS.VIEW_SUBSCRIBED_USER:
      return <ViewSuscribedCustomer data={subscribedUserData} />
    case FORMS.DISPUTE_MANAGEMENT:
      return <DisputeDetail data={selectedDispute }/>
    default:
      return null
  }
};

export default FormsContainer;