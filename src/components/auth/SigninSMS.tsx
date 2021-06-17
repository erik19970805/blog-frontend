import React, { useState } from 'react';

const SigninSMS = (): JSX.Element => {
  const [phone, setPhone] = useState('');
  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="phone">Número de Teléfono</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={phone}
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
