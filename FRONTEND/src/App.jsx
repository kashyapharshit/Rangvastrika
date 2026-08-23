import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileMenu from './components/layout/MobileMenu';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <AppRoutes />
      </main>
      <MobileMenu />
      <Footer />
    </div>
  );
}

export default App;
