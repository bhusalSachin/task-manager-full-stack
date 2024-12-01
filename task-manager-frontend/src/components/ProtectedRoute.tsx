import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const location = useLocation(); // To access the current location (URL)

  useEffect(() => {
    // Check if user is trying to access a protected route
    if (
      !cookie.token &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      navigate("/login");
    }
  }, [cookie.token, navigate, location.pathname]);

  return null; // This component doesn't render anything, just handles redirection logic
};
