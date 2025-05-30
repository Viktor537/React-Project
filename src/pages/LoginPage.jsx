import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import { Link } from 'react-router-dom';


const LoginPage = () => {
  const handleLoginSubmit = (credentials) => {
    console.log('Login form submitted (from LoginPage):', credentials);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <LoginForm onSubmit={handleLoginSubmit} />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;