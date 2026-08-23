import { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "../api/userApi";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");

  const saveProfile = async () => {
    setMessage("Saving...");
    try {
      await updateProfile({ name, email });
      setMessage("Profile updated");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <section
      className="page min-h-[80vh] flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      <div className="bg-white rounded-2xl shadow-md border border-amber-900/10 p-8 w-full max-w-sm">
        <h1 className="text-2xl font-serif font-bold text-[#2b1a12] mb-6 text-center">
          Profile
        </h1>
        <div className="flex flex-col gap-4">
          <Input
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={saveProfile} className="w-full mt-2">
            Save
          </Button>
          {message && (
            <p className="text-sm text-center text-[#4a2f1d]">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}