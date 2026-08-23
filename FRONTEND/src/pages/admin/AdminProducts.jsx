import { useState } from 'react';
import { createProduct } from '../../api/productApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function AdminProducts() {
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [message, setMessage] = useState('');

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
      });
      setMessage('Product created');
      setForm({ name: '', price: '', description: '' });
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to create product');
    }
  };

  return (
    <section className="page">
      <h1>Admin Products</h1>
      <form onSubmit={onCreate} className="stack">
        <Input id="product-name" label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input id="product-price" type="number" min="0" label="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <Input id="product-description" label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Button type="submit">Create Product</Button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
}
