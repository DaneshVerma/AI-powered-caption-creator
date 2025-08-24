import { Link, useNavigate, useLocation } from "react-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authed, setAuthed] = useState(Boolean(Cookies.get("token")));

  useEffect(() => {
    // update when route changes (cookie may change after auth)
    setAuthed(Boolean(Cookies.get("token")));
  }, [location]);

  const handleLogout = () => {
    // If backend later adds /auth/logout, call it here; for now remove cookie client-side.
    Cookies.remove("token");
    setAuthed(false);
    navigate("/", { replace: true });
  };

  return (
    <header className='w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
      <nav className='mx-auto max-w-5xl px-4 h-14 flex items-center justify-between'>
        <Link to='/' className='font-semibold tracking-tight text-lg'>
          <span className='rounded-xl px-2 py-1 bg-gray-900 text-white'>
            captionair
          </span>{" "}
          <span className='text-gray-700'>ai</span>
        </Link>

        <div className='flex items-center gap-3'>
          {authed ? (
            <>
              <button
                onClick={handleLogout}
                className='rounded-xl cursor-pointer px-3 py-2 text-sm bg-gray-900 text-white hover:opacity-90'
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/'
              className='rounded-xl px-3 py-2 text-sm bg-gray-900 text-white hover:opacity-90'
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
