import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import LoginForm from './forms/LoginForm';
import HomeForm from './forms/HomeForm';
import HomePage from './views/HomePage';
import ImageForm from './forms/ImageForm';
import SnackBar from './components/SnackBar'
import HomeList from './components/HomeList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <SnackBar />
      <NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomeList" element={<HomeList />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/HomeForm" element={<HomeForm />} />
          <Route path="/ImageForm/:id" element={<ImageForm />} />
        </Routes>
      </NavBar>
    </Router>
  );
}

export default App;
