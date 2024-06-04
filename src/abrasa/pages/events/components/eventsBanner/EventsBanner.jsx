import { useEvents } from "../../../../hooks/useEvents"

export const EventsBanner = () => {

  const { filter } = useEvents();

  return (
    <div className="events-banner">
      <div className="events-banner__page">
        <h3 className="events-banner__page-title">
          <i className='bx bx-list-check events-banner__page-icon'></i>
          Eventos / <span>{ filter.toUpperCase() }</span></h3>
      </div>
    </div>
  )
}
