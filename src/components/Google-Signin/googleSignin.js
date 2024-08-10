// src/GoogleSignIn.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

// const clientId = '955815544053-psqq65pgnq6l5gphr2r6goqkt6u8qq9v.apps.googleusercontent.com';

function GoogleSignIn({ onSuccess, onFailure }) {
  const successHandler = (credentialResponse) => {
    const token = credentialResponse.credential;
    onSuccess(token);
  };

  const errorHandler = (error) => {
    onFailure(error);
  };

  return (
    <div>
      <GoogleLogin
        className="sign"
        onSuccess={successHandler}
        onError={errorHandler}
      />
    </div>
  );
}

export default GoogleSignIn;
