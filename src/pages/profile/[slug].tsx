import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OtherInfo from '../../components/profile/OtherInfo';
import UserBlogs from '../../components/profile/UserBlogs';
import UserInfo from '../../components/profile/UserInfo';
import { IParams, RootStore } from '../../interfaces/react.interface';

const Profile = (): JSX.Element => {
  const { slug }: IParams = useParams();
  const { auth } = useSelector((state: RootStore) => state);
  return (
    <div className="row my-3">
      <div className="col-md-5 mb-3">
        {auth.user?._id === slug ? <UserInfo /> : <OtherInfo id={auth.user?._id || ''} />}
      </div>
      <div className="col-md-7">
        <UserBlogs />
      </div>
    </div>
  );
};

export default Profile;
