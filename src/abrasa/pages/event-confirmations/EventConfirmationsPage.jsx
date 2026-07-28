import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useConfirmations, useEvents } from '../../hooks';
import { useUI } from '../../../hooks';
import { LayoutAbrasa } from '../../layout/abrasa/LayoutAbrasa';
import {
  ConfirmationsHeader,
  ConfirmationsTable,
  EventInfoSidebar,
  ModalCreateConfirmation,
} from './components';

export const EventConfirmationPage = () => {
  const { id } = useParams();
  const { event, getEvent } = useEvents();
  const { confirmationsPageModal } = useUI();
  const {
    confirmations,
    page,
    totalPages,
    total,
    totalAdults,
    totalKids,
    totalPeople,
    isLoading,
    deleteConfirmation,
    nextPage,
    prevPage,
  } = useConfirmations();

  useEffect(() => {
    if (id) {
      getEvent(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = (confirmationId) => {
    deleteConfirmation(confirmationId, { eventId: id, page, limit: 30 });
  };

  return (
    <LayoutAbrasa>
      <div className="event-confirmations-page">
        <ConfirmationsHeader
          event={event}
          totalRegistros={total}
          totalPeople={totalPeople}
          totalAdults={totalAdults}
          totalKids={totalKids}
        />

        <div className="event-confirmations-page__grid">
          <div className="event-confirmations-page__main">
            <ConfirmationsTable
              confirmations={confirmations}
              isLoading={isLoading}
              page={page}
              totalPages={totalPages}
              total={total}
              onNextPage={nextPage}
              onPrevPage={prevPage}
              onDeleteConfirmation={handleDelete}
              eventName={event?.name || 'evento'}
            />
          </div>

          <div className="event-confirmations-page__sidebar">
            <EventInfoSidebar event={event} />
          </div>
        </div>
      </div>

      {confirmationsPageModal?.isOpen && <ModalCreateConfirmation />}
    </LayoutAbrasa>
  );
};
