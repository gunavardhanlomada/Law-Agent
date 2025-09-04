import React from 'react';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';

function App() {

  return (
    <>
    
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/legalsearch" element={<div>legalsearch Page</div>} />
      <Route path="/aichat" element={<div>ai chat Page</div>} />
      <Route path="/researchagent" element={<div>research agent Page</div>} />
      <Route path="/resources" element={<div>resources Page</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
