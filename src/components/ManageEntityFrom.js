import React, { useState } from 'react';
import EntityManager from './EntityManager'

const ManageEntityFrom = () => {
    const [entityName, setEntityName] = useState('');

  return (
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
  )
}

export default ManageEntityFrom