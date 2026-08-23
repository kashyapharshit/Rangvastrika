import axios from 'axios';
import { API_BASE_URL, AUTH_STORAGE_KEY } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const auth = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!auth) return config;

  try {
    const parsedAuth = JSON.parse(auth);
    if (parsedAuth?.token) {
      config.headers.Authorization = ['Bearer', parsedAuth.token].join(' ');
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return config;
});

export default axiosInstance;
