import { useEvents } from "../../../../hooks"

export const EventsPagination = () => {

  const { nextPage, prevPage, page, totalPages } = useEvents();

  return (
    <div className="events-pagination">
      <div className="events-pagination__pages">
        <div 
          onClick={ prevPage }
          className={`events-pagination__button ${ page === 1 && 'hide-element'}`}>
          <i className='bx bx-chevron-left events-pagination__icon' ></i>
        </div>
        <p className="events-pagination__number">{ page }</p>
        <div 
          onClick={ nextPage }
          className={`
            events-pagination__button 
            ${ (totalPages === 1 || page === totalPages ) && 'hide-element' }
          `}>
          <i className='bx bx-chevron-right events-pagination__icon' ></i>
        </div>
      </div>
    </div>
  )
}
