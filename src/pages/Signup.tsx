import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Signup = (): JSX.Element => (
  <div className="auth-page">
    <div className="auth-box">
      <h3 className="text-uppercase text-center mb-4">Registro</h3>
      <RegisterForm />
      <p className="mt-2">
        Ya tiene una cuenta?
        <Link to="/signin" style={{ color: 'crimson' }}>
          Iniciar Sesión
        </Link>
      </p>
    </div>
  </div>
);

export default Signup;
