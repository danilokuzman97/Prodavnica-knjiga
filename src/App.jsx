import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Publishers from './pages/Publishers';
import Books from './pages/Books';
import BookForm from './pages/BookForm';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/publishers" element={<Publishers/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/create-book" element={<BookForm />} /> 
        <Route path="/edit-book/:id" element={<BookForm />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
