import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import { validateRegister } from "../utils/validators";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const message = validateRegister(form);
    if (message) {
      setError(message);
      return;
    }

    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section
      className="page min-h-[80vh] flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      <div className="bg-white rounded-2xl shadow-md border border-amber-900/10 p-8 w-full max-w-sm">
        <h1 className="text-2xl font-serif font-bold text-[#2b1a12] mb-6 text-center">
          Register
        </h1>
        <form onSubmit={onSubmit} className="stack flex flex-col gap-4">
          <Input
            id="register-name"
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            id="register-email"
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            id="register-password"
            type="password"
            label="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          {error && (
            <p className="error text-sm text-red-500 -mt-1">{error}</p>
          )}
          <Button type="submit" className="w-full mt-2">
            Create account
          </Button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#7a5236] font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}