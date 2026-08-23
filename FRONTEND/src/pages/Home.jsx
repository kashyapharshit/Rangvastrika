import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="page">
      <h1>Rangvastrika Store</h1>
      <p>Handpicked ethnic products and handcrafted collections.</p>
      <Link to="/products">Browse products</Link>
    </section>
  );
}
