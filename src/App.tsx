import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './Components/UserLogin/Login';
import Register from './Components/UserLogin/Register';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
