import { Link, useNavigate, useLocation } from "react-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FiZap, FiLogOut, FiLogIn } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authed, setAuthed] = useState(Boolean(Cookies.get("token")));

  useEffect(() => {
    setAuthed(Boolean(Cookies.get("token")));
  }, [location]);

  const handleLogout = () => {
    Cookies.remove("token");
    setAuthed(false);
    navigate("/", { replace: true });
  };

  return (
    <header className='border-b-[2.5px] border-neo-black bg-neo-white sticky top-0 z-50'>
      <nav className='mx-auto max-w-5xl px-4 h-16 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-2 no-underline'>
          <span className='neo-badge bg-neo-yellow text-neo-black text-base px-3 py-1 flex items-center gap-1'>
            <FiZap size={16} className='inline' />
            captionair
          </span>
        </Link>

        <div className='flex items-center gap-3'>
          {authed ? (
            <>
              <Link
                to='/use'
                className='neo-btn neo-btn-sm bg-neo-cyan text-neo-black no-underline'
              >
                Create
              </Link>
              <button
                onClick={handleLogout}
                className='neo-btn neo-btn-sm neo-btn-dark flex items-center gap-1.5'
              >
                <FiLogOut size={13} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to='/'
              className='neo-btn neo-btn-sm neo-btn-primary flex items-center gap-1.5 no-underline'
            >
              <FiLogIn size={13} />
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
