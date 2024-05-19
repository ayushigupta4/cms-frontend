// src/App.js
import React, { useState } from 'react';
import CreateEntityForm from './components/CreateEntityForm';
import EntityManager from './components/EntityManager';

const App = () => {
  const [entityName, setEntityName] = useState('');

  return (
    <div>
      <h1>Content Management System</h1>
      <CreateEntityForm />
      <div>
        <h2>Manage Entities</h2>
        <input
          type="text"
          placeholder="Enter entity name"
          value={entityName}
          onChange={(e) => setEntityName(e.target.value)}
        />
        {entityName && <EntityManager entityName={entityName} />}
      </div>
    </div>
  );
};

export default App;
