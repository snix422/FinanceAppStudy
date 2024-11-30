import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path='/signIn' element={<div></div>} />
          <Route path='/signUp' element={<div></div>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
