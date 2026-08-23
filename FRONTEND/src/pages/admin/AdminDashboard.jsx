import Sidebar from "../../components/layout/Sidebar";
import { UserCog } from "lucide-react"; // Ek simple icon welcome ke liye

export default function AdminDashboard() {
  return (
    // Wrapper: Full width with sidebar
    <div className="flex min-h-screen w-full bg-[#FBF7F2]">
      
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-10 flex flex-col items-center justify-center">
        
        {/* Simple & Clean Welcome Box */}
        <div className="bg-white rounded-3xl p-10 sm:p-16 shadow-md border border-[#7a5236]/10 w-full max-w-2xl text-center flex flex-col items-center">
           
           {/* Icon / Avatar */}
           <div className="bg-[#FBF3E9] p-6 rounded-full mb-6 shadow-inner border border-[#7a5236]/20">
             <UserCog size={48} className="text-[#7a5236]" />
           </div>
           
           {/* Welcome Text */}
           <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2b1a12] mb-4">
             Welcome to Admin Dashboard
           </h1>
           
           {/* Subtext/Instructions */}
           <p className="text-base text-gray-500 leading-relaxed max-w-md">
             You are now in the control center of Rangvastrika. Use the sidebar menu on the left to manage your products, track orders, and oversee your store's operations.
           </p>

        </div>

      </main>
    </div>
  );
}