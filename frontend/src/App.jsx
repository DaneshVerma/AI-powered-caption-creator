import { Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import UsePage from "./pages/UsePage";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
