import { Link, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import UsePage from "./pages/UsePage";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="select-none">
      <Navbar />
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route
          path='/use'
          element={
            <Protected>
              <UsePage />
            </Protected>
          }
        />
      </Routes>
      <footer className='w-full mx-auto flex justify-center items-center px-4 h-14 border-t bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
        <Link
          to={"https://github.com/DaneshVerma"}
          className='font-semibold text-gray-900'
        >
          &copy; [<i>Danesh</i>]
        </Link>
      </footer>
    </div>
  );
};

export default App;
