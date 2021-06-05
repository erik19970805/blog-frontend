import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (): JSX.Element => (
  <div className="text-center bg-light py-4">
    <h6>Benvenido a un ejemplo de practica </h6>
    <Link className="mb-2 d-block" to="https://www.google.com" target="_blank" rel="noreferrer">
      https://www.google.com
    </Link>
    <p>Copyright &copy; 2021</p>
  </div>
);

export default Footer;
