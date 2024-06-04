import { useEvents } from "../../../../hooks/useEvents";

export const EventsHeader = () => {
  const { changeFilter, filter } = useEvents();

  return (
    <header className="events-header">
      <div className="events-header__information">
        <i className="bx bx-calendar-event events-header__icon"></i>
        <h1 className="events-header__title">Tus Eventos</h1>
      </div>

      <nav className="events-navigation">
        <ul className="events-navigation__list">
          <li
            onClick={() => changeFilter('todos')}
            className={`events-navigation__item ${
              filter === 'todos' &&
              'events-navigation__item--selected'
            }`}
          >
            Todos
          </li>
          <li
            onClick={() => changeFilter('graduación')}
            className={`events-navigation__item ${
              filter === 'graduación' &&
              'events-navigation__item--selected'
            }`}
          >
            Graduaciones
          </li>
          <li
            onClick={() => changeFilter('posada')}
            className={`events-navigation__item ${
              filter === 'posada' &&
              'events-navigation__item--selected'
            }`}
          >
            Posadas
          </li>
          <li
            onClick={() => changeFilter('xv')}
            className={`events-navigation__item ${
              filter === 'xv' &&
              'events-navigation__item--selected'
            }`}
          >
            XV años
          </li>
          <li
          onClick={() => changeFilter('boda')}
          className={`events-navigation__item ${
            filter === 'boda' &&
            'events-navigation__item--selected'
          }`}
          >
            Bodas
          </li>
        </ul>
      </nav>
    </header>
  )
}
