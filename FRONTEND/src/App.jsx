import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileMenu from "./components/layout/MobileMenu";
import FloatingWhatsAppButton from "./components/layout/FloatingWhatsAppButton";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Yahan se max-w, mx-auto, aur px/py hata diya gaya hai */}
      <main className="flex-1 w-full">
        <AppRoutes />
      </main>
      <FloatingWhatsAppButton />
      <MobileMenu />
      <Footer />
    </div>
  );
}

export default App;