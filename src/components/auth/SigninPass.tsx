import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormSutmit, InputChange } from '../../interfaces/react.interfaces';
import { signin } from '../../redux/actions/auth.actions';

const SigninPass = (): JSX.Element => {
  const initialState = { account: '', password: '' };
  const [userSignin, setUserSignin] = useState(initialState);
  const { account, password } = userSignin;
  const [typePass, setTypePass] = useState(false);
  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name } = e.target;
    setUserSignin({ ...userSignin, [name]: value });
  };

  const handleSubmit = (e: FormSutmit) => {
    e.preventDefault();
    dispatch(signin(userSignin));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Correo Electrónico
        </label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          placeholder="ejemplo@gmail.com"
          onChange={handleChangeInput}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>

        <div className="pass">
          <input
            type={typePass ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <small onClick={() => setTypePass(!typePass)}>{typePass ? 'Hide' : 'show'}</small>
        </div>
      </div>
      <button type="submit" className="btn btn-dark w-100 mt-1" disabled={!(account && password)}>
        Login
      </button>
    </form>
  );
};
export default SigninPass;
