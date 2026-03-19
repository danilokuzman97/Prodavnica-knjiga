import React, { useState } from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Publishers from './pages/Publishers';
import Books from './pages/Books';
import BookForm from './pages/BookForm';
import Login from './pages/Login';
import UserContext from './userContext';
import GoogleCallback from "./pages/GoogleCallback";
import SearchVolumes from './pages/SearchVolumes';

function App() {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser}}>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publishers" element={<Publishers/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/create-book" element={<BookForm />} /> 
        <Route path="/edit-book/:id" element={<BookForm />} />
        <Route path="/volumes/search" element={<SearchVolumes />} />
        <Route path="/google-callback" element={<GoogleCallback />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
