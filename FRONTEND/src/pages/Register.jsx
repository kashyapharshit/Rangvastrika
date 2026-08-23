import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { validateRegister } from '../utils/validators';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const message = validateRegister(form);
    if (message) {
      setError(message);
      return;
    }

    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="page">
      <h1>Register</h1>
      <form onSubmit={onSubmit} className="stack">
        <Input id="register-name" label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input id="register-email" label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input id="register-password" type="password" label="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="error">{error}</p>}
        <Button type="submit">Create account</Button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </section>
  );
}
