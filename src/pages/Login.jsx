import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../userContext';
import AxiosConfig from '../axiosConfig.js';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // useEffect se ovde koristi kako bi se proverilo da li je već ulogovan korisnik
  // ako u localStorage postoji token, onda će korisnik biti preusmeren na /books
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
        navigate('/books');
      } catch (err) {
        console.error('Nevalidan token:', err);
        localStorage.removeItem('token');
      }
    }
  }, [setUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await AxiosConfig.post('/Auth/login', {
        username,
        password
      });
      const token = response.data;
      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
      navigate('/books');
    } catch (err) {
      setError('Neuspešna prijava. Proveri podatke.');
    }
  };

  const handleGoogleLogin = () => {
  window.open(
    "http://localhost:5234/api/Auth/google-login", 
    "width=500,height=600"
  );
};

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Prijava</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input type="text" placeholder="Korisničko ime"
          value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Lozinka"
          value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Prijavi se</button>

      <button onClick={handleGoogleLogin}>Login with Google</button>
    </form>
  );
};

export default Login;