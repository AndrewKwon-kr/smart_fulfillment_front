import axios from 'axios';

export const CHECK_EMAIL = 'check_email';
export const CHECK_PHONE = 'check_phone';
export const LOGIN_USER = 'login_user';
export const SIGNUP_USER = 'signup_user';
export const AUTH_USER = 'auth_user';
export const LOGOUT_USER = 'logout_user';

const token = () => localStorage.getItem('user');

const config = () => ({
  headers: {
    authorization: token(),
  },
});

export function checkEmail(dataToSubmit) {
  const request = axios
    .get(
      `${process.env.REACT_APP_URL}:10010/smartseller/member/duplicateEmail?email=${dataToSubmit}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      // console.log('error occured in userActions.js - checkEmail() \n', error);
      return null;
    });

  return {
    type: CHECK_EMAIL,
    payload: request,
  };
}

export function checkPhone(dataToSubmit) {
  const request = axios
    .get(
      `${process.env.REACT_APP_URL}:10010/smartseller/member/duplicatePhone?phone=${dataToSubmit}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // console.log('error occured in userActions.js - checkPhone() \n', error);
      return null;
    });

  return {
    type: CHECK_PHONE,
    payload: request,
  };
}

export function signUp(dataToSubmit) {
  const request = axios
    .post(
      `${process.env.REACT_APP_URL}:10010/smartseller/member/localRegister`,
      dataToSubmit
    )
    .then((response) => {
      if (response.status === 201) {
        return { status: 201 };
      }
    })
    .catch((error) => {
      // console.log('error occured in userActions.js - signUp() \n', error);
      return { status: 500, result: error };
    });

  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

export function logIn(dataToSubmit) {
  const request = axios
    .post(
      `${process.env.REACT_APP_URL}:10010/smartseller/member/localLogin`,
      dataToSubmit
    )
    .then((response) => {
      axios.defaults.headers.common['authorization'] = response.data.jwt;
      return response.data;
    })
    .catch(() => {
      return null;
    });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(
      `${process.env.REACT_APP_URL}:10010/smartseller/member/checkToken`,
      config()
    )
    .then((response) => response.data)
    .catch(() => {
      // console.log('error occured in userActions.js - auth() \n', error);
      return null;
    });

  return {
    type: AUTH_USER,
    payload: request,
  };
}
