import React, { useState, useEffect } from "react";
import AxiosConfig from '../axiosConfig.js';

export default function SearchIssues({ volumeId }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [price, setPrice] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  useEffect(() => {
    fetchIssues();
  }, [volumeId]);

  const fetchIssues = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await AxiosConfig.get(`/Volumes/${volumeId}/issues`);
      setIssues(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    console.log(selectedIssue);
    if (!price || !availableCopies) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const dto = {
        name: selectedIssue.name,
        coverDate: selectedIssue.cover_date 
          ? new Date(selectedIssue.cover_date).toISOString() 
          : new Date().toISOString(),
        issueNumber: selectedIssue.issue_Number,
        imagePath: "",
        description: "",
        externalApiId: selectedIssue.id,
        pageCount: 0,
        price: parseFloat(price),
        availableCopies: parseInt(availableCopies)
      };
      await AxiosConfig.post('/Volumes/issues', dto);
      setSaveSuccess("Issue saved successfully!");
      setSelectedIssue(null);
      setPrice("");
      setAvailableCopies("");
    } catch (err) {
      alert("Error saving issue.");
    }
  };

  if (loading) return <p>Loading issues...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;

  return (
    <div style={{marginTop: '30px'}}>
      <h3>Issues for Volume {volumeId}</h3>

      {saveSuccess && <p style={{color: 'green'}}>{saveSuccess}</p>}

      {issues.length > 0 && (
        <table border="1" style={{width: '100%'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Issue Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>
                <td>{issue.name}</td>
                <td>{issue.issue_Number}</td>
                <td>
                  <button onClick={() => {
                    setSelectedIssue(issue);
                    setSaveSuccess("");
                  }}>
                    Save Issue
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedIssue && (
        <div style={{marginTop: '20px', border: '1px solid #ccc', padding: '20px'}}>
          <h4>Save Issue: {selectedIssue.name}</h4>
          <div style={{marginBottom: '10px'}}>
            <label style={{display: 'inline-block', width: '150px'}}>ID (external):</label>
            <input type="text" value={selectedIssue.id} disabled />
          </div>
          <div style={{marginBottom: '10px'}}>
            <label style={{display: 'inline-block', width: '150px'}}>Name:</label>
            <input type="text" value={selectedIssue.name || ""} disabled />
          </div>
          <div style={{marginBottom: '10px'}}>
            <label style={{display: 'inline-block', width: '150px'}}>Issue Number:</label>
            <input type="text" value={selectedIssue.issue_number || ""} disabled />
          </div>
          <div style={{marginBottom: '10px'}}>
            <label style={{display: 'inline-block', width: '150px'}}>Cover Date:</label>
            <input type="text" value={selectedIssue.cover_date || ""} disabled />
          </div>
          <div style={{marginBottom: '10px'}}>
            <label style={{display: 'inline-block', width: '150px'}}>Price: *</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>
          <div style={{marginBottom: '10px'}}>
            <label style={{display: 'inline-block', width: '150px'}}>Available Copies: *</label>
            <input
              type="number"
              value={availableCopies}
              onChange={(e) => setAvailableCopies(e.target.value)}
              placeholder="Enter available copies"
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setSelectedIssue(null)} style={{marginLeft: '10px'}}>Cancel</button>
        </div>
      )}
    </div>
  );
}