import React from "react";
import { useState, useEffect } from 'react';
import { getAllBooks, deleteBook } from '../services/bookService.js';
import { useNavigate } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try{
      const data = await getAllBooks();
      setBooks(data);
      setErrorMsg('');
    }
    catch(error){
      console.error('FETCH books problem', error);
      setErrorMsg('ERROR fetching books');
    }
  };

  useEffect(() => {
    fetchBooks();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setRole(payload.role);
      } catch (error) {
        console.error('Invalid token');
      }
    }
  }, []);

  const handleDelete = async (id) => {
    try{
      await deleteBook(id);
      fetchBooks();
    }
    catch(error){
      console.error('DELETE book ne radi', error);
      setErrorMsg('Error pri brisanju knjige')
    }
  };


return (
    <div>
      <h1>Books</h1>
      {role && (
      <button onClick={() => navigate('/create-book')}>Add Book</button>
      )}
      {errorMsg && <p>{errorMsg}</p>}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Page count</th>
            <th>Published date</th>
            <th>ISBN</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Actions</th>
            {role === "Editor" && (
              <>
                <th>Edit</th>
                <th>Delete</th>
              </>
            )}  
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.pageCount}</td>
              <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
              <td>{book.isbn}</td>
              <td>{book.author?.fullName || 'N/A'}</td>
              <td>{book.publisher?.name || 'N/A'}</td>
              {role === "Editor" && (
                <>
              <td>
                <button onClick={() => navigate(`/edit-book/${book.id}`)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
              </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Books;