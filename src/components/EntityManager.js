// src/components/EntityManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EntityManager = ({ entityName }) => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({});
  const [editing, setEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({});

  useEffect(() => {
    fetchEntries();
  }, [entityName]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/entity/${entityName}`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleChange = (e) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setCurrentEntry({
      ...currentEntry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/entity/${entityName}`, newEntry);
      setNewEntry({});
      fetchEntries();
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  const handleEdit = (entry) => {
    setEditing(true);
    setCurrentEntry(entry);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/entity/${entityName}/${currentEntry.id}`, currentEntry);
      setEditing(false);
      setCurrentEntry({});
      fetchEntries();
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/entity/${entityName}/${id}`);
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div>
      <h2>Manage {entityName}</h2>
      <form onSubmit={editing ? handleUpdate : handleSubmit}>
        {Object.keys(editing ? currentEntry : newEntry).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="text"
              name={key}
              value={editing ? currentEntry[key] : newEntry[key]}
              onChange={editing ? handleEditChange : handleChange}
            />
          </div>
        ))}
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {Object.entries(entry).map(([key, value]) => (
              <span key={key}>{key}: {value} </span>
            ))}
            <button onClick={() => handleEdit(entry)}>Edit</button>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityManager;
