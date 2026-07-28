import logoAbrasa from '../../../../../assets/img/logo-light.png';
import { useUI } from '../../../../../hooks';
import { useAuthentication } from '../../../../../auth/hooks';

export const EventsListDefault = () => {
  const { openModal } = useUI();
  const { user } = useAuthentication();

  return (
    <section className="events-default">
      <div className="events-card">
        <figure className="events-card__figure">
          <img className="events-card__image" src={ logoAbrasa } alt="" />
        </figure>
        <div className="events-card__container">
          <header className="events-card__header">
            <span className="events-card__tag">Comenzar</span>
            <p className='events-card__title'>No hay eventos</p>
          </header>
          <p className="events-card__descr">
            {user?.role === 'Cliente'
              ? 'No tienes eventos asignados en este momento.'
              : 'Puedes comenzar a crear algún evento y darle los boletos que necesites.'}
          </p>
        </div>
        {user?.role !== 'Cliente' && (
          <footer className="events-card__footer">
            <button onClick={ () => openModal('eventsPageModal', 'createEvent') } className='events-card__button btn btn--outline'>Crear evento</button>
          </footer>
        )}
      </div>
    </section>
  );
};
