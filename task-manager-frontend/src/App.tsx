import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import Signup from "./components/Signup";
import { useLocation } from "react-router-dom";

// This component is used to check the cookie and redirect based on its presence
const ProtectedRoute = () => {
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !cookie.token &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      navigate("/login");
    }
  }, [cookie.token, navigate, location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <ProtectedRoute /> {/* ProtectedRoute will handle redirection logic */}
    </Router>
  );
}

export default App;
