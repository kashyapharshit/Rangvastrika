import { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../hooks/useAuth';
import { updateProfile } from '../api/userApi';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');

  const saveProfile = async () => {
    setMessage('Saving...');
    try {
      await updateProfile({ name, email });
      setMessage('Profile updated');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <section className="page">
      <h1>Profile</h1>
      <Input id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={saveProfile}>Save</Button>
      {message && <p>{message}</p>}
    </section>
  );
}
