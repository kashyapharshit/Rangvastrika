import axiosInstance from './axiosInstance';

export const getProducts = async (params = {}) => {
  const { data } = await axiosInstance.get('/products', { params });
  return data;
};

export const createProduct = async (payload) => {
  const { data } = await axiosInstance.post('/products', payload);
  return data;
};
