import axios from 'axios';
import { getEnvVariables } from '../../helpers';

const { VITE_API_URL_PROD } = getEnvVariables();
console.log(VITE_API_URL_PROD);
const abrasaApi = axios.create({
  baseURL: VITE_API_URL_PROD,
});

abrasaApi.interceptors.request.use((config) => {
  let tokenString = '';

  const token = JSON.parse(localStorage.getItem('user'));

  if (token) {
    tokenString = token;
  }

  config.headers = {
    ...config.headers,
    Authorization: 'Bearer ' + tokenString,
  };

  return config;
});

export default abrasaApi;
