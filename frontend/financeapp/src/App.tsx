import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import BudgetPage from './pages/BudgetPage';
import UserPanelAdmin from './pages/UserPanelAdmin';
import RoleBasedLayout from './pages/RoleBasedLayout';
import { useAuth } from './hooks/useAuth';

function App() {

  const {user} = useAuth();

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={user ? <RoleBasedLayout /> : <HomePage />} />
          <Route path='/signIn' element={<SignInPage />} />
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path='/budget/:id' element={<BudgetPage />} />
          <Route path='/user/:id' element={<UserPanelAdmin />} />
        </Routes>
    </div>
  );
}

export default App;
