import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';
import { facebookSignin, googleSignin } from '../../redux/actions/auth.actions';

const SocialSignin = (): JSX.Element => {
  const dispatch = useDispatch();

  const onSuccess = (googleUser: GoogleLoginResponse) => {
    const { id_token: idToken } = googleUser.getAuthResponse();
    dispatch(googleSignin(idToken));
  };

  const onFBSuccess = (response: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = response.authResponse;
    dispatch(facebookSignin(accessToken, userID));
  };

  return (
    <>
      <div className="my-2">
        <GoogleLogin
          client_id="1068173799726-h4je8opef7d2kiob36idjv6alho3ii0r.apps.googleusercontent.com"
          cookiepolicy="single_host_origin"
          onSuccess={onSuccess}
        />
      </div>
      <div className="my-2">
        <FacebookLogin appId="531518884709485" onSuccess={onFBSuccess} />
      </div>
    </>
  );
};

export default SocialSignin;
