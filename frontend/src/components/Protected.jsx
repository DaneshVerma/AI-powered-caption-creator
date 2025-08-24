import { Navigate } from "react-router";
import Cookies from "js-cookie";

export default function Protected({ children }) {
  const hasToken = Boolean(Cookies.get("token"));
  if (!hasToken) return <Navigate to='/' replace />;
  return children;
}
