import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import { validateLogin } from "../utils/validators";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const message = validateLogin(form);
    if (message) {
      setError(message);
      return;
    }

    try {
      await login(form);
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <section
      className="page min-h-[80vh] flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      <div className="bg-white rounded-2xl shadow-md border border-amber-900/10 p-8 w-full max-w-sm">
        <h1 className="text-2xl font-serif font-bold text-[#2b1a12] mb-6 text-center">
          Login
        </h1>
        <form onSubmit={onSubmit} className="stack flex flex-col gap-4">
          <Input
            id="login-email"
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            id="login-password"
            type="password"
            label="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {error && (
            <p className="error text-sm text-red-500 -mt-1">{error}</p>
          )}
          <Button type="submit" className="w-full mt-2">
            Login
          </Button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-6">
          New here?{" "}
          <Link to="/register" className="text-[#7a5236] font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}