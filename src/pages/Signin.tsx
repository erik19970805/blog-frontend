import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SigninPass from '../components/auth/SigninPass';
import SigninSMS from '../components/auth/SigninSMS';

const Signin = (): JSX.Element => {
  const [sms, setSms] = useState(false);
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h3 className="text-uppercase text-center mb-4">Inicio de sección</h3>
        {sms ? <SigninSMS /> : <SigninPass />}
        <small className="row my-2 text-primary" style={{ cursor: 'pointer' }}>
          <span className="col-6">
            <Link to="/forgot_password" className="col-6">
              Olvido su contraseña?
            </Link>
          </span>
          <span className="col-6 text-end" onClick={() => setSms(!sms)}>
            {sms ? 'Iniciar sesión con contraseña' : 'Iniciar sesión con SMS'}
          </span>
        </small>
        <p>
          Aun no tiene una cuenta?
          <Link to="/signup" style={{ color: 'crimson' }}>
            Regístrese Ahora
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
