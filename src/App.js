import React from 'react';
import CreateEntityForm from './components/CreateEntityForm';
import ManageEntityFrom from './components/ManageEntityFrom';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'


const App = () => {
  

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
      
        <Routes>
          <Route exact path='/' element={<CreateEntityForm />}></Route>
          <Route exact path='/manage-entity' element={<ManageEntityFrom/>}></Route>
        </Routes>
        
        
      </BrowserRouter>
      
    </div>
  );
};

export default App;
