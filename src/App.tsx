import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './Components/UserLogin/Login';
import Register from './Components/UserLogin/Register';
import HomePage from './Components/MainPage/HomePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-register" element={<Register />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
