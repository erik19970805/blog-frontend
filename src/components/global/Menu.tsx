import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (): JSX.Element => {
  const bfLoginLinks = [
    { label: 'Iniciar Sesión', path: '/signin' },
    { label: 'Registrarse', path: '/signup' },
  ];
  return (
    <ul className="navbar-nav ms-auto">
      {bfLoginLinks.map((link, index) => (
        <li className="nav-item" key={index}>
          <Link className="nav-link" to={link.path}>
            {link.label}
          </Link>
        </li>
      ))}
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Link
        </Link>
      </li>

      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle"
          to="/"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Nombre de Usuario
        </Link>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link className="dropdown-item" to="/profile">
              Perfil
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/">
              Cerrar Sesión
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <Link className="nav-link disabled" to="/" aria-disabled="true">
          Disabled
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
