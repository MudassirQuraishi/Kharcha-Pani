import React, { useState } from 'react';
import LoginForm from './components/Login';
import Signup from './components/Signup';
import Title from './components/Title';

import './App.css'; // Import your CSS file for styling

function App() {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_FORNT_END_PORT}`
  const [showLogin, setShowLogin] = useState(true);

  const switchToLogin = () => {
    setShowLogin(true);
  };

  const switchToSignup = () => {
    setShowLogin(false);
  };

  return (
    <>

      <div className="container">
        <Title title={showLogin ? 'Login' : 'Signup'}></Title>
        {showLogin ? (
          <LoginForm switchToSignup={switchToSignup} API_BASE_URL={API_URL} />
        ) : (
          <Signup switchToLogin={switchToLogin} API_BASE_URL={API_URL} />
        )}
      </div>
    </>

  );
}

export default App;
