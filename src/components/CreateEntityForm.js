// src/components/CreateEntityForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateEntityForm = () => {
  const [entityName, setEntityName] = useState('');
  const [attributes, setAttributes] = useState([{ name: '', type: 'STRING' }]);

  const handleAttributeChange = (index, event) => {
    const values = [...attributes];
    values[index][event.target.name] = event.target.value;
    setAttributes(values);
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, { name: '', type: 'STRING' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/create-entity', {
        entityName,
        attributes,
      });
      alert('Entity created successfully!');
    } catch (error) {
      console.error('Error creating entity:', error);
      alert('Failed to create entity');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Entity Name:</label>
        <input
          type="text"
          value={entityName}
          onChange={(e) => setEntityName(e.target.value)}
          required
        />
      </div>
      <div>
        <h3>Attributes</h3>
        {attributes.map((attr, index) => (
          <div key={index}>
            <label>Attribute Name:</label>
            <input
              type="text"
              name="name"
              value={attr.name}
              onChange={(event) => handleAttributeChange(index, event)}
              required
            />
            <label>Type:</label>
            <select
              name="type"
              value={attr.type}
              onChange={(event) => handleAttributeChange(index, event)}
            >
              <option value="STRING">String</option>
              <option value="INTEGER">Number</option>
              <option value="DATE">Date</option>
            </select>
          </div>
        ))}
      </div>
      <button type="button" onClick={handleAddAttribute}>
        Add Attribute
      </button>
      <button type="submit">Create Entity</button>
    </form>
  );
};

export default CreateEntityForm;
