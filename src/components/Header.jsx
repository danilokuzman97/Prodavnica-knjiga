import React, { useEffect, useContext } from "react";
import { Outlet, Link } from 'react-router-dom';
import UserContext from "../userContext";
import LogoutButton from "./LogoutButton";

function Header() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
      } catch (error) {
        console.error('Nevalidan token');
      }
    }
  }, []);

  return (
    <div>
      <nav>
        <Link to="/publishers">Publishers</Link><br />
        <Link to="/books">Books</Link><br />
        {user && user.role === "Editor" && (
          <Link to="/volumes/search">Search Volumes</Link>
        )}
        {/* Create book i Logout vidljivi samo prijavljenim korisnicima */}
        {user && (
          <>
            <Link to="/create-book">Create book</Link><br />
            <LogoutButton />
          </>
        )}
        {/* Login link vidljiv samo neprijavljenim korisnicima */}
        {!user && (
          <Link to="/">Login</Link>
        )}
      </nav>
    </div>
  );
}

export default Header;
