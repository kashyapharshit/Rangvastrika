import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileMenu from "./components/layout/MobileMenu";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-[1100px] mx-auto px-4 sm:px-6 py-8">
        <AppRoutes />
      </main>
      <MobileMenu />
      <Footer />
    </div>
  );
}

export default App;