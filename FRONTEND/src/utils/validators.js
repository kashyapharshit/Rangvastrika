export const isEmail = (value = '') => /\S+@\S+\.\S+/.test(value);

export const validateLogin = ({ email, password }) => {
  if (!isEmail(email)) return 'Please enter a valid email';
  if (!password || password.length < 6) return 'Password should be at least 6 characters';
  return '';
};

export const validateRegister = ({ name, email, password }) => {
  if (!name?.trim()) return 'Name is required';
  return validateLogin({ email, password });
};

export const validateAddress = (address = '') => {
  if (!address.trim()) return 'Shipping address is required';
  return '';
};
