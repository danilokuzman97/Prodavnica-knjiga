import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Publishers from './pages/Publishers';
import Books from './pages/Books';
import CreateBook from './pages/CreateBook';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/publishers" element={<Publishers/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/create-book" element={<CreateBook/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
