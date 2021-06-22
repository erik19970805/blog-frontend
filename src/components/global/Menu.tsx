import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootStore } from '../../interfaces/react.interfaces';
import { signout } from '../../redux/actions/auth.actions';

const Menu = (): JSX.Element => {
  const { auth } = useSelector((state: RootStore) => state);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const bfLoginLinks = [
    { label: 'Iniciar Sesión', path: '/signin' },
    { label: 'Registrarse', path: '/signup' },
  ];

  const afLoginLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Crear Blog', path: '/create_blog' },
  ];

  const navLinks = auth.accessToken ? afLoginLinks : bfLoginLinks;

  const isActive = (pn: string) => {
    if (pn === pathname) return 'active';
    return undefined;
  };

  return (
    <ul className="navbar-nav ms-auto">
      {navLinks.map((link, index) => (
        <li className={`nav-item ${isActive(link.path)}`} key={index}>
          <Link className="nav-link" to={link.path}>
            {link.label}
          </Link>
        </li>
      ))}
      {auth.user && (
        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={auth.user.avatar} alt="avatar" className="avatar" />
          </span>
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
              <Link className="dropdown-item" to="/" onClick={() => dispatch(signout())}>
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </li>
      )}
    </ul>
  );
};

export default Menu;
