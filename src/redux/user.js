const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_USER_INFO = 'SET_USER_INFO';
const DELETE_USER_INFO = 'DELETE_USER_INFO';

// actions
export const login = (token) => {
  localStorage.setItem('ACCESSTOKEN', token);

  return { type: LOGIN, token };
};

export const logout = () => {
  localStorage.removeItem('ACCESSTOKEN');
  localStorage.removeItem('REFRESHTOKEN');
  localStorage.removeItem('email');

  return { type: LOGOUT };
};

export const setUserInfo = (info) => ({ type: SET_USER_INFO, payload: info });
export const deleteUserInfo = () => ({ type: DELETE_USER_INFO });

const initialState = {
  token: null,
  isAdmin: 0,
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case SET_USER_INFO:
      return {
        ...prevState,
        ...action.payload,
      };
    case DELETE_USER_INFO:
      return {
        token: prevState.token,
      };
    default:
      return prevState;
  }
};

export default userReducer;
