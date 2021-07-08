import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUserProfile } from '../../interfaces/profile.interface';
import { FormSutmit, InputChange, RootStore } from '../../interfaces/react.interface';
import { updateUser, resetPassword } from '../../redux/actions/profile.actions';
import NotFound from '../global/NotFound';

const UserInfo = (): JSX.Element => {
  const initialState = { name: '', account: '', avatar: '', password: '', cfPassword: '' };
  const { auth } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUserProfile>(initialState);
  const { name, avatar, password, cfPassword } = user;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const handleChangeInput = (e: InputChange) => {
    const { name: nameT, value } = e.target;
    setUser({ ...user, [nameT]: value });
  };

  const handleChangeFile = (e: InputChange) => {
    const { files } = e.target as HTMLInputElement;
    if (files) {
      const file = files[0];
      setUser({ ...user, avatar: file });
    }
  };

  const handleSubmit = (e: FormSutmit) => {
    e.preventDefault();
    if (avatar || name) dispatch(updateUser(avatar, name));
    if (password) dispatch(resetPassword(password, cfPassword));
  };

  if (!auth.user) return <NotFound />;

  return (
    <form className="profile-info" onSubmit={handleSubmit}>
      <div className="info-avatar">
        <img src={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar} alt="avatar" />
        <span>
          <i className="fas fa-camera" />
          <p>Cambiar</p>
          <input
            type="file"
            accept="image/*"
            name="file"
            id="file-up"
            onChange={handleChangeFile}
          />
        </span>
      </div>
      <div className="form-group my-3">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          defaultValue={auth.user.name}
          onChange={handleChangeInput}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="account">Cuenta</label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          defaultValue={auth.user.account}
          onChange={handleChangeInput}
          disabled
        />
      </div>
      {auth.user.type !== 'register' && (
        <small className="text-danger">
          * Se Inicio sesisión rapida con {auth.user.type}, por ende no puede utilizar esta función
          *
        </small>
      )}
      <div className="form-group my-3">
        <label htmlFor="password">Contraseña</label>
        <div className="pass">
          <input
            type={typePass ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
            disabled={auth.user.type !== 'register'}
          />
          <small onClick={() => setTypePass(!typePass)}>{typePass ? 'Hide' : 'Show'}</small>
        </div>
      </div>
      <div className="form-group my-3">
        <label htmlFor="cfPassword">Contraseña</label>
        <div className="pass">
          <input
            type={typeCfPass ? 'text' : 'password'}
            className="form-control"
            id="cfPassword"
            name="cfPassword"
            value={cfPassword}
            onChange={handleChangeInput}
            disabled={auth.user.type !== 'register'}
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>{typeCfPass ? 'Hide' : 'Show'}</small>
        </div>
      </div>
      <button className="btn btn-outline-primary w-100" type="submit">
        Actualizar
      </button>
    </form>
  );
};

export default UserInfo;
