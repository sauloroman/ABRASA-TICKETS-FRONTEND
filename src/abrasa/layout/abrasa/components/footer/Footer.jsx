export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__info">
          <p className="footer__text">© {new Date().getFullYear()}, Hecho con ❤ para hacer una mejor web</p>
          <span className="footer__copy">Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  )
}
