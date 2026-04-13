import { useState } from "react";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import api from "../config/api";
import { useNavigate } from "react-router";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [msgType, setMsgType] = useState("error"); // 'error' | 'success'
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
      setMsgType("success");
      setMsg(data?.message || "Success");
      navigate("/use", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong";
      setMsgType("error");
      setMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setMsg(null);
    try {
      const { data } = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });
      setMsgType("success");
      setMsg(data?.message || "Logged in with Google");
      navigate("/use", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Google login failed";
      setMsgType("error");
      setMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setMsgType("error");
    setMsg("Google login was cancelled or failed");
  };

  return (
    <main className='min-h-[calc(100vh-8rem)] flex items-center justify-center bg-neo-cream px-4 py-10'>
      <div className='w-full max-w-md'>
        {/* Decorative header */}
        <div className='text-center mb-6'>
          <span className='neo-badge bg-neo-pink text-neo-black mb-3 inline-block rotate-[-2deg]'>
            {mode === "login" ? "Welcome back!" : "Join the club"}
          </span>
          <h1 className='text-3xl font-heading font-bold text-neo-black'>
            {mode === "login" ? "Sign in to " : "Create your "}
            <span className='bg-neo-yellow px-1.5 border-[2.5px] border-neo-black inline-block'>
              captionair
            </span>
          </h1>
        </div>

        {/* Card */}
        <div className='neo-card p-6'>
          {/* Google Login */}
          <div className='google-btn-wrapper mb-4'>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text={mode === "login" ? "signin_with" : "signup_with"}
              shape='rectangular'
              size='large'
              width='100%'
            />
          </div>

          {/* Divider */}
          <div className='flex items-center gap-3 my-4'>
            <div className='flex-1 border-t-[2px] border-neo-black/20' />
            <span className='text-sm font-heading font-medium text-neo-black/50 uppercase tracking-wide'>
              or
            </span>
            <div className='flex-1 border-t-[2px] border-neo-black/20' />
          </div>

          {/* Form */}
          <form onSubmit={submit} className='space-y-4'>
            <div>
              <label className='block text-sm font-heading font-semibold mb-1.5'>
                Username
              </label>
              <div className='relative'>
                <FiUser
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-neo-black/40'
                  size={16}
                />
                <input
                  name='username'
                  value={form.username}
                  onChange={onChange}
                  placeholder='jane_doe'
                  className='neo-input pl-9'
                  autoComplete='username'
                  required
                />
              </div>
            </div>
            {mode === "register" && (
              <div>
                <label className='block text-sm font-heading font-semibold mb-1.5'>
                  Email
                </label>
                <div className='relative'>
                  <FiMail
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-neo-black/40'
                    size={16}
                  />
                  <input
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={onChange}
                    placeholder='jane@example.com'
                    className='neo-input pl-9'
                    autoComplete='email'
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className='block text-sm font-heading font-semibold mb-1.5'>
                Password
              </label>
              <div className='relative'>
                <FiLock
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-neo-black/40'
                  size={16}
                />
                <input
                  type='password'
                  name='password'
                  value={form.password}
                  onChange={onChange}
                  placeholder='••••••••'
                  className='neo-input pl-9'
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  required
                />
              </div>
            </div>

            {msg && (
              <div
                className={`neo-badge text-sm w-full text-center py-2 ${
                  msgType === "error"
                    ? "bg-neo-red/20 text-neo-red"
                    : "bg-neo-lime text-neo-black"
                }`}
              >
                {msg}
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='neo-btn neo-btn-dark w-full flex items-center justify-center gap-2'
            >
              {loading ? (
                "Please wait..."
              ) : (
                <>
                  {mode === "login" ? "Login" : "Create Account"}
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className='mt-5 text-sm text-center font-body text-neo-black/60'>
            {mode === "login" ? (
              <>
                No account yet?{" "}
                <button
                  onClick={() => {
                    setMode("register");
                    setMsg(null);
                  }}
                  className='font-heading font-semibold text-neo-black underline decoration-[2px] decoration-neo-yellow underline-offset-2 cursor-pointer hover:decoration-neo-pink transition-colors bg-transparent border-none'
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setMsg(null);
                  }}
                  className='font-heading font-semibold text-neo-black underline decoration-[2px] decoration-neo-yellow underline-offset-2 cursor-pointer hover:decoration-neo-pink transition-colors bg-transparent border-none'
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
