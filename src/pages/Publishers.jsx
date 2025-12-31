import React from "react";
import { useState, useEffect } from 'react';
import { getAllPublishers } from '../services/publisherService.js';

function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchData = async () => {
    try{
      setPublishers(await getAllPublishers());
    }
    catch(error) {
      console.error('Fetch publishers failed:', error);
      setErrorMsg('ERROR, greska...')
}
  };

  useEffect(() => {
    fetchData();
  }, []);


  return(
    <div>
      <h1>Publishers</h1>

      {errorMsg && <p>{errorMsg}</p>}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map(publisher => (
            <tr key={publisher.id}>
              <td>{publisher.id}</td>
              <td>{publisher.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Publishers;