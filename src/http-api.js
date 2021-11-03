import axios from 'axios';

let HOST = 'https://api2fulfillment.sellha.kr';

// if (process.env.REACT_APP_URL === 'production') {
//   HOST = 'https://api2fulfillment.sellha.kr/'; // master 서버
// }

export { HOST };

export async function checkDuplicateEmail(email) {
  const { data } = await axios.get(`${HOST}/auth/duplicate-email/`, {
    params: { email },
  });
  return !!data.isDuplicated;
}
export async function checkDuplicatePhone(phone) {
  const { data } = await axios.get(`${HOST}/auth/duplicate-phone/`, {
    params: { phone },
  });
  return !!data.isDuplicated;
}
export async function localSignup(signupForm) {
  const res = await axios.post(`${HOST}/auth/users/`, signupForm);
  return res.status;
}
export async function checkVerify(token) {
  return axios.post(`${HOST}/auth/jwt/verify/`, token).then((res) => res);
}
export async function checkRefresh(token) {
  return axios.post(`${HOST}/auth/jwt/refresh/`, token).then((res) => res);
}
export async function sendFindPassword(name, email) {
  return axios
    .post(`${HOST}/send-find-password`, { name, email })
    .then((res) => res.data);
}
export async function createJwt(signupForm) {
  return axios.post(`${HOST}/auth/jwt/create/`, signupForm);
}
