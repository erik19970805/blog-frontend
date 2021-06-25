import React from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import { useDispatch } from 'react-redux';
import { googleSignin } from '../../redux/actions/auth.actions';

const SocialSignin = (): JSX.Element => {
  const dispatch = useDispatch();

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const { id_token: idToken } = googleUser.getAuthResponse();
    dispatch(googleSignin(idToken));
  };

  return (
    <div className="my-2">
      <GoogleLogin
        client_id="1068173799726-h4je8opef7d2kiob36idjv6alho3ii0r.apps.googleusercontent.com"
        cookiepolicy="single_host_origin"
        onSuccess={onSuccess}
      />
      ,
    </div>
  );
};

export default SocialSignin;
