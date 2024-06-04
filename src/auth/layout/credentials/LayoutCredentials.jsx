import { Link } from 'react-router-dom';
import { SwiperCom } from './components/swiperCom/SwiperCom';
import loginLogo from '../../../assets/img/logo-light.png';
import { useUI } from '../../../hooks';
import { Spinner } from '../../../components';

export const LayoutCredentials = ({
  children,
  titlePage = '',
  descriptionPage = '',
  disclamerPage = '',
  navigatePage = '',
  navigateTextPage = '',
}) => {

  const { isLoading } = useUI();

  return (
    <div className="layout-credentials">
      <section className="layout-credentials__content">
        <header className="layout-credentials__header">
          <figure className="layout-credentials__header-figure">
            <img
              className="layout-credentials__header-img"
              src={loginLogo}
              alt="Logo Abrasa Black"
            />
          </figure>
        </header>

        <div className="layout-credentials__information">
          <div className="layout-credentials__wel">
            <h1 className="heading-primary layout-credentials__wel-title text-important">
              {titlePage}
            </h1>
            <p className="layout-credentials__wel-text">{descriptionPage}</p>
          </div>

          { !isLoading ? ( children ) : ( <Spinner/>) }
    
        </div>

        <p className="layout-credentials__disclaimer text-center">
          {disclamerPage}
          <Link className="layout-credentials__disclaimer-link" to={`${navigatePage}`}>
            {navigateTextPage}
          </Link>
        </p>
      </section>

      <SwiperCom />
    </div>
  );
};
