import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import api from "../config/api";
import { FiUpload, FiZap, FiImage, FiVideo, FiCopy } from "react-icons/fi";
import { useState } from "react";

export default function LandingPage() {
  const authed = Boolean(Cookies.get("token"));
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);

  const handleGoogleSuccess = async (credentialResponse) => {
    setMsg(null);
    try {
      await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });
      navigate("/use", { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message || "Google login failed";
      setMsg(message);
    }
  };

  const handleGoogleError = () => setMsg("Google login cancelled or failed");

  return (
    <main className='bg-neo-cream'>
      {/* Hero Section */}
      <section className='mx-auto max-w-5xl px-4 pt-16 pb-20'>
        <div className='grid md:grid-cols-2 gap-10 items-center'>
          {/* Left — Copy */}
          <div>
            <span className='neo-badge bg-neo-lime text-neo-black mb-4 inline-block'>
              AI-Powered ⚡
            </span>
            <h1 className='text-5xl md:text-6xl font-heading font-bold leading-[1.1] mb-5 text-neo-black'>
              Captions that{" "}
              <span className='bg-neo-yellow px-2 border-[2.5px] border-neo-black inline-block rotate-[-1deg]'>
                slap.
              </span>
            </h1>
            <p className='text-lg text-neo-black/70 font-body mb-8 max-w-md leading-relaxed'>
              Drop your photo or video, pick a vibe, and let Gemini AI generate
              the perfect caption. No more staring at a blank text box.
            </p>
            <div className='flex flex-wrap gap-3'>
              {authed ? (
                <Link
                  to='/use'
                  className='neo-btn neo-btn-primary text-lg no-underline'
                >
                  <span className='flex items-center gap-2'>
                    <FiZap size={18} />
                    Create Caption
                  </span>
                </Link>
              ) : (
                <div className='flex items-center gap-3'>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                  />
                  <span className='text-sm text-neo-black/60'>{msg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right — Visual */}
          <div className='relative flex justify-center'>
            <div className='neo-card bg-neo-peach p-6 w-full max-w-sm rotate-[2deg] animate-float'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='neo-badge bg-neo-white'>Preview</span>
              </div>
              <div className='bg-neo-white border-[2.5px] border-neo-black rounded-xl p-4 mb-3'>
                <div className='flex items-center gap-2 text-neo-black/60 mb-2'>
                  <FiImage size={16} />
                  <span className='text-sm font-heading font-medium'>
                    sunset_beach.jpg
                  </span>
                </div>
                <div className='h-24 bg-neo-cream border-[2px] border-neo-black rounded-lg flex items-center justify-center'>
                  <span className='text-3xl'>🌅</span>
                </div>
              </div>
              <div className='bg-neo-yellow border-[2.5px] border-neo-black rounded-xl p-3'>
                <p className='text-sm font-body font-medium text-neo-black leading-relaxed'>
                  "Golden hour hits different when the ocean's your backdrop
                  🌊✨ #SunsetVibes #BeachLife"
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className='absolute -top-4 -right-4 md:-right-8 neo-badge bg-neo-cyan text-neo-black rotate-[6deg]'>
              Gemini AI
            </div>
            <div className='absolute -bottom-3 -left-3 w-8 h-8 bg-neo-pink border-[2.5px] border-neo-black rounded-full' />
            <div className='absolute top-10 -left-4 w-5 h-5 bg-neo-lime border-[2px] border-neo-black rotate-45' />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='border-t-[2.5px] border-neo-black bg-neo-white'>
        <div className='mx-auto max-w-5xl px-4 py-16'>
          <h2 className='text-3xl font-heading font-bold text-center mb-3'>
            How it works
          </h2>
          <p className='text-center text-neo-black/60 font-body mb-12 max-w-md mx-auto'>
            Three steps to captions that actually get engagement.
          </p>

          <div className='grid md:grid-cols-3 gap-6'>
            <div className='neo-card p-5'>
              <div className='w-12 h-12 bg-neo-yellow border-[2.5px] border-neo-black rounded-xl flex items-center justify-center mb-4'>
                <FiUpload size={22} />
              </div>
              <h3 className='text-lg font-heading font-bold mb-2'>
                1. Upload media
              </h3>
              <p className='text-sm text-neo-black/70 font-body'>
                Drag in any photo or video. We support JPG, PNG, WebP, MP4,
                WebM, and more.
              </p>
            </div>

            <div className='neo-card p-5 bg-neo-lavender'>
              <div className='w-12 h-12 bg-neo-white border-[2.5px] border-neo-black rounded-xl flex items-center justify-center mb-4'>
                <FiZap size={22} />
              </div>
              <h3 className='text-lg font-heading font-bold mb-2'>
                2. Pick your vibe
              </h3>
              <p className='text-sm text-neo-black/70 font-body'>
                Choose language, mood, tone — sarcastic? romantic? trendy? You
                decide.
              </p>
            </div>

            <div className='neo-card p-5'>
              <div className='w-12 h-12 bg-neo-cyan border-[2.5px] border-neo-black rounded-xl flex items-center justify-center mb-4'>
                <FiCopy size={22} />
              </div>
              <h3 className='text-lg font-heading font-bold mb-2'>
                3. Copy & post
              </h3>
              <p className='text-sm text-neo-black/70 font-body'>
                Gemini AI crafts a caption. Copy it, paste on instagram, done.
                That simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported formats */}
      <section className='border-t-[2.5px] border-neo-black bg-neo-cream'>
        <div className='mx-auto max-w-5xl px-4 py-16 text-center'>
          <h2 className='text-3xl font-heading font-bold mb-3'>
            Photos{" "}
            <span className='bg-neo-pink px-2 border-[2.5px] border-neo-black inline-block rotate-[-1deg]'>
              &
            </span>{" "}
            Videos
          </h2>
          <p className='text-neo-black/60 font-body mb-8 max-w-md mx-auto'>
            Both types of media are supported. Upload a sunset photo or a recipe
            reel — we'll caption it.
          </p>
          <div className='flex justify-center gap-4 flex-wrap'>
            <span className='neo-btn neo-btn-sm bg-neo-peach text-neo-black flex items-center gap-2 cursor-default'>
              <FiImage size={14} /> JPG, PNG, WebP, GIF
            </span>
            <span className='neo-btn neo-btn-sm bg-neo-blue text-neo-black flex items-center gap-2 cursor-default'>
              <FiVideo size={14} /> MP4, WebM, MOV
            </span>
          </div>

          {/* CTA */}
          <div className='mt-12'>
            {authed ? (
              <Link
                to='/use'
                className='neo-btn neo-btn-dark text-lg no-underline'
              >
                Start creating captions →
              </Link>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
