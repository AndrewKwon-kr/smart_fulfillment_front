import axios from 'axios';

let HOST = 'https://api2fulfillment.sellha.kr';

// if (process.env.REACT_APP_URL === 'production') {
//   HOST = 'https://api2fulfillment.sellha.kr/'; // master 서버
// }

export { HOST };

export async function checkDuplicateEmail(email) {
  console.log(email);
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
export function checkVerify(token) {
  return axios.post(`${HOST}/auth/jwt/verify/`, token);
}
export function checkRefresh(token) {
  return axios.post(`${HOST}/auth/jwt/refresh/`, token);
}
export async function sendFindPassword(name, email) {
  const res = await axios.post(`${HOST}/send-find-password/`, { name, email });
  return res.data;
}
export async function createJwt(signupForm) {
  return axios.post(`${HOST}/auth/jwt/create/`, signupForm);
}
// Page ERP
export async function getBrandData() {
  return axios.get(`${HOST}/brand/`);
}
export async function createItemgroups(data) {
  return axios.post(`${HOST}/brand/itemgroups/items/`, data).then((res) => res);
}
export async function updateItemGroups(data) {
  return axios.post(`${HOST}/brand/itemgroups/items/`, data).then((res) => res);
}
export async function getItemGroups() {
  return axios.get(`${HOST}/itemgroup/items/`).then((res) => res);
}
export async function updateItemgroupsImage(data) {
  return axios.put(`${HOST}/itemgroup/imagestest/`, data);
}

// Page EventRegistration
export async function getItemGroupsBrand() {
  return axios.get(`${HOST}/brand/itemgroups/items1/`).then((res) => res);
}
export async function getEventChannel(groupId) {
  const res = await axios.get(
    `http://192.168.0.124:8000/${groupId}/channel/event/`
  );
  return res.data.result;
}

// Page FreebieAndPrint
export async function updateFreebieAndPrintData(url, data) {
  return axios.put(`${HOST}/${url}/`, data).then((res) => res);
}

// Page OrderCollection
export function postSabangnetData(data) {
  return axios.post(`${HOST}/order/sabangnet/`, data);
}

// Page MyPage
export async function getMyInfo(data) {
  const res = await axios.post(`${HOST}/auth/mypage/`, data);
  return res.data.result;
}

// Page ChannelRegistration
export async function getSabangnetChannelList(groupId) {
  const res = await axios.get(`${HOST}/${groupId}/channel/sabangnet/`);
  return res.data.result;
}

export function createUserChannel(groupId, data) {
  return axios.post(`${HOST}/${groupId}/channel/map/`, data);
}

export async function getUserChannel(groupId) {
  const res = await axios.get(`${HOST}/${groupId}/channel/user/`);
  return res.data.result;
}

export function deleteUserChannel(groupId, data) {
  return axios.delete(`${HOST}/${groupId}/channel/map-delete/`, { data: data });
}

export function registSabangnetChannel(groupId) {
  return axios.get(
    `http://192.168.0.124:8000/${groupId}/channel/sabangnet-call/`
  );
}
