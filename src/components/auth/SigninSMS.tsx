import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormSutmit } from '../../interfaces/react.interfaces';
import { signinSMS } from '../../redux/actions/auth.actions';

const SigninSMS = (): JSX.Element => {
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: FormSutmit) => {
    e.preventDefault();
    dispatch(signinSMS(phone));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="phone">Número de Teléfono</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={phone}
          placeholder="+593933456785"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-dark w-100" disabled={!phone}>
        Login
      </button>
    </form>
  );
};

export default SigninSMS;
