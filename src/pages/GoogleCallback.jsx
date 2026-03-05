// GoogleCallback.jsx
import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../userContext";

const GoogleCallback = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Čitanje tokena iz URL-a: ?token=...
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (err) {
        console.error("Nevalidan token:", err);
      }

      // Preusmeravanje na željenu stranicu
      navigate("/books");
    } else {
      console.error("Token nije pronađen u URL-u");
    }
  }, [location.search, navigate, setUser]);

  return <div>Učitavanje...</div>;
};

export default GoogleCallback;
