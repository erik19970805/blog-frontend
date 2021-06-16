import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../interfaces/react.interfaces';
import Loading from './Loading';
import Toast from './Toast';

const Alert = (): JSX.Element => {
  const { alert } = useSelector((state: RootStore) => state);
  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && <Toast title="Errores" body={alert.error} bgColor="bg-danger" />}
      {alert.success && <Toast title="Correcto" body={alert.success} bgColor="bg-success" />}
    </div>
  );
};

export default Alert;
