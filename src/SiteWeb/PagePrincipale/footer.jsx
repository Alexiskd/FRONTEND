import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #025920;
  color: #FFFFFF;
  padding: 2rem 1rem;
  border-top: 2px solid #4CAF50;
  margin-top: 2rem;

  a {
    color: #FFFFFF;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #4CAF50;
    }
  }

  .footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    text-align: center;
  }

  .footer-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .footer-text {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;

    i {
      font-size: 1.5rem;
      color: #FFFFFF;
      transition: color 0.3s ease;

      &:hover {
        color: #4CAF50;
      }
    }
  }

  .footer-bottom {
    margin-top: 2rem;
    font-size: 0.8rem;
    text-align: center;
  }
`;

const Footer = () => (
  <FooterContainer>
    <div className="footer-grid">
      {/* Section principale */}
      <div>
        <h4 className="footer-title">Maison Bouvet - CLÉ SERVICE</h4>
        <p className="footer-text">
          20 rue Lévis - 75017 Paris <br />
          Tél : <strong>01 42 67 48 61</strong> <br />
          <a href="mailto:contact@cleservice.com">contact@cleservice.com</a> <br />
          Lun-Ven : 8h30-12h30 / 14h-18h
        </p>
      </div>

      {/* Liens utiles */}
      <div>
        <h4 className="footer-title">Liens utiles</h4>
        <p className="footer-text">
          <a href="/mentions-legales">Mentions légales</a> <br />
          <a href="/politique-confidentialite">Politique de confidentialité</a> <br />
          <a href="/conditions-generales">Conditions générales</a>
        </p>
      </div>

      {/* Informations légales */}
      <div>
        <h4 className="footer-title">Informations légales</h4>
        <p className="footer-text">
          Maison Bouvet - S.A.S. <br />
          RCS : <strong>500 188 339</strong> <br />
          TVA : <strong>FR55500188339</strong>
        </p>
      </div>
    </div>

    {/* Icons des réseaux sociaux */}
    <div className="social-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook-f" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter" />
      </a>
    </div>

    {/* Copyright */}
    <div className="footer-bottom">
      © {new Date().getFullYear()} Maison Bouvet - Tous droits réservés.
    </div>
  </FooterContainer>
);

export default Footer;
