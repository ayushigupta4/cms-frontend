import React from 'react';
import CreateEntityForm from './components/CreateEntityForm';
import ManageEntityFrom from './components/ManageEntityFrom';


const App = () => {
  

  return (
    <div>
      <h1>Content Management System</h1>
      <CreateEntityForm />
      <ManageEntityFrom/>
    </div>
  );
};

export default App;
