import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <Link to="/publishers">Publishers</Link><br></br>
      <Link to="/books">Books</Link><br></br>
      <Link to="/create-book">Create book</Link><br></br>
    </nav>
  );
}

export default Header;
