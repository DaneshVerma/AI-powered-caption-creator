import { useState } from "react";
import api from "../config/api";
import { useNavigate } from "react-router";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const url = mode === "login" ? "/auth/login" : "/auth/register";
      const { data } = await api.post(url, form);
      // If backend cookie set ho gaya, just navigate
      setMsg(data?.message || "Success");
      navigate("/use", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong";
      setMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-[calc(90vh-56px)] grid place-items-center bg-gray-50 px-4'>
      <div className='w-full max-w-md'>
        <div className='rounded-2xl bg-white shadow-sm border p-6'>
          <h1 className='text-2xl font-semibold mb-1'>
            Welcome to{" "}
            <span className='px-2 py-0.5 rounded-lg bg-gray-900 text-white'>
              captionair
            </span>{" "}
            <span className='text-gray-700'>ai</span>
          </h1>
          <p className='text-gray-500 mb-6'>
            Login to continue, or create a new account.
          </p>

          <form onSubmit={submit} className='space-y-4'>
            <div>
              <label className='block text-sm mb-1'>Username</label>
              <input
                name='username'
                value={form.username}
                onChange={onChange}
                placeholder='jane_doe'
                className='w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10'
                autoComplete='username'
                required
              />
            </div>
            {mode === "register" && (
              <div>
                <label className='block text-sm mb-1'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={onChange}
                  placeholder='jane@example.com'
                  className='w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10'
                  autoComplete='email'
                  required
                />
              </div>
            )}
            <div>
              <label className='block text-sm mb-1'>Password</label>
              <input
                type='password'
                name='password'
                value={form.password}
                onChange={onChange}
                placeholder='••••••••'
                className='w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900/10'
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                required
              />
            </div>

            {msg && (
              <div className='border-b capitalize bg-gray-50 px-3 py-2 text-sm text-red-700'>
                {msg}
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='w-full cursor-pointer   rounded-xl bg-gray-900 text-white py-2.5 hover:opacity-90 disabled:opacity-50'
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          <div className='mt-4 text-sm text-center text-gray-600'>
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("register")}
                  className='underline cursor-pointer underline-offset-4'
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className='underline cursor-pointer underline-offset-4'
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
