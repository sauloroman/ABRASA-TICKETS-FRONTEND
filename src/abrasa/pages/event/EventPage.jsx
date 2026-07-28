import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useEvents, useTickets } from "../../hooks";
import { LayoutAbrasa } from "../../layout/abrasa/LayoutAbrasa"
import { EventCover, EventInformation, EventTable, EventStats, ModalEvent } from "./components";
import { useUI } from "../../../hooks";

export const EventPage = () => {

  const { id } = useParams();
  const { getEvent } = useEvents();
  const { tickets, getTotalPages } = useTickets();
  const { eventPageModal, confirmModal } = useUI();

  useEffect(() => {
    if (id) {
      getEvent(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    getTotalPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets]);

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

      {(eventPageModal.isOpen || confirmModal.isOpen) && <ModalEvent />}
    </LayoutAbrasa>
  )
}
