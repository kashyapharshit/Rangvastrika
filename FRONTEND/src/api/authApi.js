import axiosInstance from './axiosInstance';

export const register = async (payload) => {
  const { data } = await axiosInstance.post('/auth/register', payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await axiosInstance.post('/auth/login', payload);
  return data;
};
