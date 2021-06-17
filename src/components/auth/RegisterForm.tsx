import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormSutmit, InputChange } from '../../interfaces/react.interfaces';
import { signup } from '../../redux/actions/auth.actions';

const RegisterForm = (): JSX.Element => {
  const initialState = { name: '', account: '', password: '', cfPassword: '' };
  const [userRegister, setUserRegister] = useState(initialState);
  const { name, account, password, cfPassword } = userRegister;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e: InputChange) => {
    const { value, name: targetName } = e.target;
    setUserRegister({ ...userRegister, [targetName]: value });
  };

  const handleSubmit = (e: FormSutmit) => {
    e.preventDefault();
    dispatch(signup(userRegister));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          onChange={handleChangeInput}
          placeholder="Su nombre debe ser menor a 20 caracteres"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          Correo Electrónico / Número de Teléfono
        </label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
          placeholder="Ejemplo@gmail.com / +593987654321"
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
            placeholder="La contraseña debe ser mayor a 6 caracteres"
          />
          <small onClick={() => setTypePass(!typePass)}>{typePass ? 'Hide' : 'show'}</small>
        </div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="cfPassword" className="form-label">
          Confirmar Contraseña
        </label>
        <div className="pass">
          <input
            type={typeCfPass ? 'text' : 'password'}
            className="form-control"
            id="cfPassword"
            name="cfPassword"
            value={cfPassword}
            onChange={handleChangeInput}
            placeholder="Vuelva a escribir su contraseña"
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>{typeCfPass ? 'Hide' : 'show'}</small>
        </div>
      </div>
      <button type="submit" className="btn btn-dark w-100 my-1">
        Crear Cuenta
      </button>
    </form>
  );
};
export default RegisterForm;
