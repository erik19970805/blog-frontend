import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import SigninPass from '../components/auth/SigninPass';
import SigninSMS from '../components/auth/SigninSMS';
import SocialSignin from '../components/auth/SocialSignin';
import { RootStore } from '../interfaces/react.interface';

const Signin = (): JSX.Element => {
  const [sms, setSms] = useState(false);
  const history = useHistory();
  const { auth } = useSelector((state: RootStore) => state);
  useEffect(() => {
    if (auth.accessToken) history.push('/');
  }, [auth.accessToken, history]);
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h3 className="text-uppercase text-center mb-4">Inicio de sección</h3>
        <SocialSignin />
        {sms ? <SigninSMS /> : <SigninPass />}
        <small className="row my-2 text-primary" style={{ cursor: 'pointer' }}>
          <span className="col-6">
            <Link to="/forgot_password" className="col-6">
              ¿Olvido su contraseña?
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
