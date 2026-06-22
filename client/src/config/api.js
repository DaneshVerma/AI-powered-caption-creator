import axios from "axios";

// When the client is served by the backend (server-side static files),
// use a relative base URL so requests go to the same origin.
// `withCredentials: true` ensures the browser sends/receives cookies.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || ".",
  withCredentials: true,
});

export default api;
