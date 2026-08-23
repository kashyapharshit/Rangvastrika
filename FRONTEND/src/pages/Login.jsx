import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validateLogin } from '../utils/validators';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const message = validateLogin(form);
    if (message) {
      setError(message);
      return;
    }

    try {
      await login(form);
      navigate(location.state?.from || '/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="page">
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="stack">
        <Input id="login-email" label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input id="login-password" type="password" label="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="error">{error}</p>}
        <Button type="submit">Login</Button>
      </form>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </section>
  );
}
