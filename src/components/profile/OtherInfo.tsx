import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../interfaces/react.interface';
import { IUser } from '../../interfaces/response.interface';
import { getOtherInfo } from '../../redux/actions/profile.actions';
import Loading from '../alert/Loading';

interface IProps {
  id: string;
}
const OtherInfo = ({ id }: IProps): JSX.Element => {
  const [other, setOther] = useState<IUser>();
  const { otherInfo } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    if (otherInfo.every((user) => user._id !== id)) {
      dispatch(getOtherInfo(id));
    } else {
      const newUser = otherInfo.find((user) => user._id === id);
      if (newUser) setOther(newUser);
    }
  }, [dispatch, id, otherInfo]);

  if (!other) return <Loading />;

  return (
    <div className="profile_info text-center rounded">
      <div className="info_avatar">
        <img src={other.avatar} alt="avatar" />
      </div>
      <h5 className="text-uppercase text-danger">{other.role}</h5>
      <div>
        Name: <span className="text-info">{other.name}</span>
      </div>
      <div>Email / Phone number</div>
      <span className="text-info">{other.account}</span>
      <div>
        Join Date:
        <span style={{ color: '#ffc107' }}>{new Date(other.createAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default OtherInfo;
