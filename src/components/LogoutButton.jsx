import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../userContext';

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return <button onClick={handleLogout}>Odjavi se</button>;
};

export default LogoutButton;