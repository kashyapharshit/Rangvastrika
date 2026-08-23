import axiosInstance from './axiosInstance';

export const createOrder = async (payload) => {
  const { data } = await axiosInstance.post('/orders', payload);
  return data;
};

export const getMyOrders = async () => {
  const { data } = await axiosInstance.get('/orders/my-orders');
  return data;
};
