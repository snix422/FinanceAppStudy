import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import BudgetPage from './pages/BudgetPage';
import UserPanelAdmin from './pages/UserPanelAdmin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path='/budget/:id' element={<BudgetPage />} />
          <Route path='/user/:id' element={<UserPanelAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
