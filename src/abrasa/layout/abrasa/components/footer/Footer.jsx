export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__info">
          <p className="footer__text">© 2024, Hecho con ❤ para hacer una mejor web</p>
          <span className="footer__copy">Todos los derechos reservados</span>
        </div>
        <nav className="footer__nav">
          <ul className="footer__list">
            <li className="footer__item">
              <a href="#">Sobre Abrasa</a>
            </li>
            <li className="footer__item">
              <a href="#">Contacto</a>
            </li>
            <li className="footer__item">
              <a href="#">Sitio web</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
