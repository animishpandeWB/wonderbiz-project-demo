import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Login} from './Components/UserLogin/Login';
import Register from './Components/UserLogin/Register';
import HomePage from './Components/MainPage/HomePage';
import PumpDetail from './Components/PumpPage/PumpDetail';
import ProfilePage from './Components/MainPage/ProfilePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/user-register" element={<Register />} />
        <Route path='/home/:id' element={<HomePage />} />
        <Route path='/pump/:id' element={<PumpDetail />} />
      </Routes>
    </div>
  );
}

export default App;
