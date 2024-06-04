import { useEvents } from "../../../../hooks"
import { EventsCard } from "../eventsCard/EventsCard"

export const EventsList = () => {

  const { events } = useEvents();

  return (
    <ul className="events-list">
      {
        events.map( event => (
          <EventsCard key={ event.id } { ...event } />
        ))
      }
    </ul>
  )
}
