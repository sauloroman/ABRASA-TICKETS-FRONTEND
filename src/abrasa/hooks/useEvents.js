import { useDispatch, useSelector } from "react-redux"
import { setFilter, setPage, setTotalPages } from "../../store/abrasa/events/events.slice";
import { startCreatingEvent, startDeletingEventById, startGettingEventById, startGettingEventsOfUser, startUpdatingEventById, startUpdatingEventPhoto } from "../../store/abrasa/events/events.thunks";

export const useEvents = () => {

  const dispatch = useDispatch();
  const { filter, events, page, totalPages, total, event } = useSelector( store => store.events );

  const changeFilter = ( selectedOption = '' ) => {
    dispatch( setFilter( selectedOption ) );
  }

  const getEventsOfUser = ( userID = '', config = {} ) => {
    dispatch( startGettingEventsOfUser( userID, config ) );
  }

  const nextPage = () => {
    dispatch( setPage( page + 1 ) );
  }
  
  const prevPage = () => {
    if ( page === 1 ) return;
    dispatch( setPage( page - 1 ) );
  }

  const getTotalPages = () => {

    let numberPages = 0;

    if ( filter === 'todos' ) {
      numberPages = Math.ceil( total / 6 );
    } else {
      numberPages = Math.ceil( events.length / 6 );
    }

    dispatch( setTotalPages( numberPages ) );
  }

  const createEvent = ( event = {}, config = {} ) => {
    dispatch( startCreatingEvent( event, config ) );
  }
  
  const deleteEvent = ( eventID = '', config = {} ) => {
    dispatch( startDeletingEventById( eventID, config ))
  }

  const getEvent = ( eventID = '' ) => {
    dispatch( startGettingEventById( eventID ));
  }

  const updateEvent = ( eventID = '', newEventInformation = {} ) => {
    dispatch( startUpdatingEventById(eventID, newEventInformation ) )
  }

  const updateEventPhoto = ( file = {}, eventID = '' ) => {
    dispatch( startUpdatingEventPhoto( file, eventID ) );
  }


  return {
    filter,
    events,
    event,
    page,
    totalPages,
    total,

    // METHODS
    changeFilter,
    getEventsOfUser,
    nextPage,
    prevPage,
    getTotalPages,
    createEvent,
    getEvent,
    updateEvent,
    updateEventPhoto,
    deleteEvent
  }
}