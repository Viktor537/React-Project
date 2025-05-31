import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (credentials) => {
    if (credentials.password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await register(credentials.email, credentials.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <RegisterForm onSubmit={handleRegisterSubmit} isLoading={isLoading} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
