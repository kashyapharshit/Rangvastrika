import { useCallback, useEffect, useState } from 'react';

export const useFetch = (fetcher, options = {}) => {
  const { immediate = true, initialData = null } = options;
  const [data, setData] = useState(initialData);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(immediate);

  const run = useCallback(async (...args) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetcher(...args);
      setData(response);
      return response;
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Request failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (immediate) {
      run().catch(() => {});
    }
  }, [immediate, run]);

  return { data, error, loading, run, setData };
};
