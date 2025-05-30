import React from 'react';
import RegisterForm from '../components/RegisterForm.jsx';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const handleRegisterSubmit = (credentials) => {
    console.log('Register form submitted (from RegisterPage):', credentials);
  };

  return (
    <div>
      <h2>Register Page</h2>
      <RegisterForm onSubmit={handleRegisterSubmit} />
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;