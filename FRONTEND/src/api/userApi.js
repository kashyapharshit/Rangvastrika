import axiosInstance from './axiosInstance';

export const getProfile = async () => {
  const { data } = await axiosInstance.get('/users/profile');
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await axiosInstance.put('/users/profile', payload);
  return data;
};
