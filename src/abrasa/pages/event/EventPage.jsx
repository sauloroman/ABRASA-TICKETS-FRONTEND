import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useEvents, useTickets } from "../../hooks";
import { LayoutAbrasa } from "../../layout/abrasa/LayoutAbrasa"
import { EventCover, EventInformation, EventTable, EventTickets, ModalEvent } from "./components";
import { useUI } from "../../../hooks";

export const EventPage = () => {

  const { id } = useParams();
  const { getEvent } = useEvents();
  const { getTicketsByEvent, getAllTickets, tickets, getTotalPages, page } = useTickets();
  const { eventPageModal, confirmModal } = useUI();

  useEffect(() => {
    getEvent( id );
    getAllTickets();
    // getTicketsByEvent( {
    //   eventID: id, 
    //   page: 1, 
    //   limit: 15
    // });

  }, []);

  // useEffect(() => {
  //   getAllTickets();
    // getTicketsByEvent( {
    //   eventID: id, 
    //   page: page, 
    //   limit: 15
    // });

  // }, [ page ]);

  // useEffect(() => {
  //   getTotalPages();
  // }, [tickets])

  return (
    <LayoutAbrasa>
      <section className="event">

        <EventCover />

        <header className="event__header">
          <EventTickets />
          <EventInformation />
        </header>
        
        <div className="event__table">
          <EventTable />
        </div>
      </section>
      { (eventPageModal.isOpen || confirmModal.isOpen) && <ModalEvent />}
    </LayoutAbrasa>
  )
}
