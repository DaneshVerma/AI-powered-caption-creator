import { Link, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import UsePage from "./pages/UsePage";
import LandingPage from "./pages/LandingPage";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";
import { FiGithub } from "react-icons/fi";

const App = () => {
  return (
    <div className='min-h-screen flex flex-col select-none'>
      <Navbar />
      <div className='flex-1'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route
            path='/use'
            element={
              <Protected>
                <UsePage />
              </Protected>
            }
          />
        </Routes>
      </div>
      <footer className='border-t-[2.5px] border-neo-black bg-neo-yellow'>
        <div className='mx-auto max-w-5xl px-4 h-14 flex items-center justify-between'>
          <span className='font-heading font-semibold text-sm text-neo-black'>
            © 2026 captionair
          </span>
          <Link
            to='https://github.com/DaneshVerma'
            target='_blank'
            rel='noopener'
            className='neo-btn-sm neo-btn bg-neo-white text-neo-black flex items-center gap-1.5 no-underline'
          >
            <FiGithub size={14} />
            DaneshVerma
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default App;
