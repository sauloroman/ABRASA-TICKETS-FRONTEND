import logoAbrasa from '../../../assets/img/logo-light.png';
import { Spinner } from '../../../components/spinner/Spinner';
import { useUI } from '../../../hooks';

export const LayoutUpdates = ({ 
  children = '', 
  title = '', 
  description = '' 
}) => {

  const { isLoading } = useUI();

  return (
    <section className="layout-updates">
      <div className="layout-updates__container">
        <header className="layout-updates__header">
          <figure className="layout-updates__figure">
            <img
              src={logoAbrasa}
              alt="Lgo Abraza White"
              className="layout-updates__image"
            />
          </figure>
          <h1 className="layout-updates__title">{ title }</h1>
          <p className="layout-updates__text"> { description }</p>
        </header>
        { !isLoading ? ( children ) : ( <Spinner /> )}
      </div>
    </section>
  );
};
