import { Link } from "react-router-dom"
import { useUI } from "../../../../../hooks";

const formatString = ( name = '', lengthString = 0 ) => {
  let finalName = name;

  if ( name.length > lengthString ) {
    finalName = name.slice( 0, lengthString ) + '...';
  }

  return finalName;
}

export const EventsCard = ({ id, image, eventType, description, eventDate, name  }) => {

  const { openModal } = useUI();

  return ( 
    <li className="events-card" >
      <figure className="events-card__figure">
        {
          image
          ? ( <img className="events-card__image" src={ image } alt="" /> )
          : ( <div className="events-card__defaultImage"></div>)
        }
      </figure>
      <div className="events-card__container">
        <header className="events-card__header">
          <span className="events-card__tag">{ eventType }</span>
          <p className='events-card__title'>{ formatString( name, 25 ) }</p>
        </header>
        <p className="events-card__descr">{ formatString(description, 90) }</p>
      </div>
      <footer className="events-card__footer">

        <div className="events-card__footer-buttons">
          <Link to={`/events/${id}`} className='events-card__button btn btn--outline'>Ver evento</Link>
          <button onClick={ () => openModal('confirmModal', 'deleteEvent', id ) } className='events-card__button btn btn--outline'>Eliminar</button>
        </div>

        <p className='events-card__date'>Fecha: <span>{ eventDate }</span></p>
      </footer>
    </li>
  )
}
 