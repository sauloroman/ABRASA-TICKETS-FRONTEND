import { useTickets } from "../../../../hooks"

export const EventStats = () => {

  const { total, totalAdults, totalKids, totalAdultsCounter, totalKidsCounter } = useTickets();

  return (
    <div className="event-stats">
      <h2 className="event-stats__title">
        <div className="event-stats__icon">
          <i className="bx bx-stats event-stats__icon-element"></i>
        </div>
        Datos del evento
      </h2>
      <div className="event-stats__container">
        <p className="event-stats__stat-main">Boletos Creados: <span>{total}</span></p>
        <div className="event-stats__box">
          <h3 className="event-stats__subtitle">Esperados</h3>
          <div className="event-stats__info">
            <p className="event-stats__stat">Adultos: <span>{totalAdults}</span></p>
            <p className="event-stats__stat">Niños: <span>{totalKids}</span></p>
            <p className="event-stats__stat">Total: <span>{totalKids + totalAdults}</span></p>
          </div>
        </div>
        <div className="event-stats__box">
          <h3 className="event-stats__subtitle">Hasta el momento</h3>
          <div className="event-stats__info">
            <p className="event-stats__stat">Adultos: <span>{totalAdultsCounter}</span></p>
            <p className="event-stats__stat">Niños: <span>{totalKidsCounter}</span></p>
            <p className="event-stats__stat">Total: <span>{totalAdultsCounter + totalKidsCounter}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
