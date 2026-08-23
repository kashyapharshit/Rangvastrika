import { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "../api/userApi";
import { User, Mail, ShieldCheck } from "lucide-react"; // Icons for extra flair

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault(); // Form submit default behavior ko rokna
    setLoading(true);
    setMessage("Saving changes...");
    try {
      // Backend ko sirf 'name' bhejenge kyunki email change nahi karna hai
      await updateProfile({ name }); 
      setMessage("Profile successfully updated! 🎉");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Avatar ke liye user ke naam ka pehla akshar nikalna
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    // 1. FULL WIDTH BACKGROUND: Hamesha ki tarah .page hata kar w-full lagaya
    <div className="w-full min-h-screen flex items-center justify-center py-12 px-4 sm:px-6" style={{ backgroundColor: "#FBF7F2" }}>
      
      {/* 2. PROFILE CARD */}
      <div className="bg-white rounded-3xl shadow-xl shadow-[#7a5236]/5 border border-[#7a5236]/10 w-full max-w-md overflow-hidden">
        
        {/* --- Cover Image & Avatar Section --- */}
        <div className="h-28 sm:h-32 bg-gradient-to-r from-[#2b1a12] to-[#7a5236] relative flex justify-center">
          
          {/* Avatar Circle */}
          <div className="absolute -bottom-10 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full p-1.5 shadow-lg">
            <div className="w-full h-full bg-[#FBF3E9] rounded-full flex items-center justify-center border border-[#7a5236]/20">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#7a5236]">
                {initial}
              </span>
            </div>
          </div>
        </div>

        {/* --- Form Section --- */}
        <div className="pt-16 pb-8 px-6 sm:px-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-bold text-[#2b1a12]">
              My Profile
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage your account details</p>
          </div>

          {/* Alert Message */}
          {message && (
            <div className={`mb-6 p-3 text-sm text-center rounded-xl font-medium border ${
              message.includes('failed') 
                ? 'bg-red-50 text-red-600 border-red-200' 
                : message.includes('Saving')
                ? 'bg-blue-50 text-blue-600 border-blue-200'
                : 'bg-green-50 text-green-700 border-green-200'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={saveProfile} className="flex flex-col gap-6">
            
            {/* Name Input (Editable) */}
            <div className="relative">
              <Input
                id="name"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <User size={16} className="absolute right-4 top-[38px] text-gray-400" />
            </div>

            {/* Email Input (Disabled/Read-only) */}
            <div className="relative">
              <Input
                id="email"
                label="Email Address"
                value={email}
                disabled // Is attribute se input type karna band ho jayega
                onChange={() => {}} // Dummy handler tak error na aaye
                className="bg-gray-50 text-gray-500 cursor-not-allowed opacity-70"
              />
              <Mail size={16} className="absolute right-4 top-[38px] text-gray-300" />
              
              {/* Note for the user */}
              <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1.5 font-medium">
                <ShieldCheck size={12} className="text-green-600" /> 
                For security reasons, email address cannot be changed.
              </p>
            </div>

            {/* Save Button */}
            <Button 
              type="submit" 
              className="w-full mt-4 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-base" 
              disabled={loading}
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </Button>
            
          </form>
        </div>

      </div>
    </div>
  );
}