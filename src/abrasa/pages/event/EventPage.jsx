import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useEvents, useTickets } from "../../hooks";
import { LayoutAbrasa } from "../../layout/abrasa/LayoutAbrasa"
import { EventCover, EventInformation, EventTable, EventStats, ModalEvent } from "./components";
import { useUI } from "../../../hooks";

export const EventPage = () => {

  const { id } = useParams();
  const { getEvent } = useEvents();
  const { getTicketsByEvent, tickets, getTotalPages, page } = useTickets();
  const { eventPageModal, confirmModal } = useUI();

  useEffect(() => {
    getEvent( id );
    getTicketsByEvent( {
      eventID: id, 
      page: 1, 
      limit: 15
    });

  }, []);

  useEffect(() => {
    getTicketsByEvent( {
      eventID: id, 
      page: page, 
      limit: 15
    });

  }, [ page ]);

  useEffect(() => {
    getTotalPages();
  }, [tickets])

  return (
    <LayoutAbrasa>

      <section className="event">
        <EventCover />
        <div className="event__grid">
          <div className="event__main">
            <EventTable />
          </div>
          <div className="event__information">
            <EventStats />
            <EventInformation />
          </div>
        </div>
      </section>

      { (eventPageModal.isOpen || confirmModal.isOpen) && <ModalEvent />}
    </LayoutAbrasa>
  )
}
