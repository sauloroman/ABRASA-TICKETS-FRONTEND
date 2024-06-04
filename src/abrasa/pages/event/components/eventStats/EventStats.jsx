import { useTickets } from "../../../../hooks"

export const EventStats = () => {

  const { total, totalAdults, totalKids } = useTickets();

  return (
    <div className="event-stats">
      <div className="event-stats__stat event-stats__stat--left">
        Boletos creados: <span>{ total }</span>
      </div>
      <div className="event-stats__stat event-stats__stat--left">
        Adultos asistentes: <span>{ totalAdults }</span>
      </div>
      <div className="event-stats__stat event-stats__stat--left">
        Niños Asistentes: <span>{ totalKids }</span>
      </div>
      <div className="event-stats__stat event-stats__stat--left">
        Total de Asistentes: <span>{ totalAdults + totalKids }</span>
      </div>
    </div>
  )
}
