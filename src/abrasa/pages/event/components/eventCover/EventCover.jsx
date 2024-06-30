import { useUI } from "../../../../../hooks";
import { useEvents } from "../../../../hooks";

export const EventCover = () => {

  const { event } = useEvents();
  const { openModal } = useUI();

  return (
    <>
      <div className="event-cover" 
        style={{ backgroundImage: `url(${ event.image })`}}
      >
        {
          event.image 
          ? (<div className="event-cover__layout"></div>) 
          : (<div className="event-cover__layoutDefault"></div>)
        }
      </div>
    </>
  )
}
