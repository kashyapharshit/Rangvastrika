import axiosInstance from './axiosInstance';

export const createOrder = async (payload) => {
  const { data } = await axiosInstance.post('/orders', payload);
  return data;
};

export const getMyOrders = async () => {
  const { data } = await axiosInstance.get('/orders/my-orders');
  return data;
};

export const getOrders = async () => {
  const { data } = await axiosInstance.get('/orders');
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await axiosInstance.patch(`/orders/${id}/status`, { status });
  return data;
};
