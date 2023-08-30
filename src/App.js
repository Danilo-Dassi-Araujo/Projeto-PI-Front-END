import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Importe o componente Login
import Home from './Components/Home'; // Importe o componente Login

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/home" element={<Home />} />
        {/* Outras rotas aqui, se necessário */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
