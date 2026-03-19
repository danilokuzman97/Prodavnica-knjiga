import React, { useState } from "react";
import AxiosConfig from "../axiosConfig.js";
import SearchIssues from "./SearchIssues.jsx";

export default function SearchVolumes() {
  const [filter, setFilter] = useState("");
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedVolumeId, setSelectedVolumeId] = useState(null);

  const handleSearch = async () => {
    if (!filter.trim()) {
      setError("Please enter a search term.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await AxiosConfig.get(
        `/Volumes/search?filter=${encodeURIComponent(filter)}`
      );
      setVolumes(response.data);
    } catch (err) {
      setError(
        "Error during search: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div>
      <h2>Search Volumes</h2>

      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Volume name"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {volumes.length > 0 && (
        <table border="1" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {volumes.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>
                  <button onClick={() => setSelectedVolumeId(v.id)}>
                    View Issues
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedVolumeId && (
        <SearchIssues volumeId={selectedVolumeId} />
      )}
    </div>
  );
}
