import { useEffect } from 'react';
import { useEvents } from '../../hooks/useEvents';
import { LayoutAbrasa } from '../../layout/abrasa/LayoutAbrasa';
import { 
  EventsBanner, 
  EventsHeader, 
  EventsInformation, 
  EventsList, 
  EventsListDefault, 
  EventsPagination, 
  ModalEvents} from './components';
import { useAuthentication } from '../../../auth/hooks';
import { useUI } from '../../../hooks';

export const EventsPage = () => {

  const { user } = useAuthentication();
  const { events, filter, page, getEventsOfUser, getTotalPages } = useEvents();
  const { eventsPageModal, confirmModal } = useUI();

  useEffect(() => {

    if (user?.id) {
      getEventsOfUser( {
        userID: user.id,
        page: 1,
        limit: 6,
        category: filter,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ filter ]);

  useEffect(() => {

    if (user?.id) {
      getEventsOfUser( {
        userID: user.id,
        page: page,
        limit: 6,
        category: filter,
      });
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ page ]);

  useEffect(() => {
    getTotalPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  return (
    <LayoutAbrasa>
      <section className="events">

        <div className="events__top">
          <EventsHeader />
          <EventsBanner />
          <EventsInformation />

          <div className="events__container">
            
            {
              events.length
              ? (
                <>
                  <EventsList />
                  <EventsPagination />
                </>
              )
              : (
                <EventsListDefault />
              )
            }
           
          </div>
          
        </div>
        { (eventsPageModal.isOpen || confirmModal.isOpen) && <ModalEvents />}
      </section>
    </LayoutAbrasa>
  );
};
