import axios from 'axios';

export async function setLocalStorage(token, pubKey, privKey, userData) {
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('pubKey', pubKey);
  localStorage.setItem('privKey', privKey);
  localStorage.setItem('userData', JSON.stringify(userData));
}

export async function authorize() {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    throw new Error('Authorization token is missing');
  }
}