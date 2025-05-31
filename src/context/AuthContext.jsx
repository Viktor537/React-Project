import React, { createContext, useState, useContext, useEffect } from "react";

const API_URL = "http://localhost:3001";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("recipeAppUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("recipeAppUser");
      }
    }
    setLoadingAuth(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${API_URL}/users?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const users = await response.json();

      if (users && users.length > 0) {
        const user = users[0];
        setCurrentUser(user);
        localStorage.setItem("recipeAppUser", JSON.stringify(user));
        return user;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error in AuthContext:", error.message);
      throw new Error(error.message || "Login failed. Please try again.");
    }
  };

  const register = async (email, password) => {
    try {
      const checkUserResponse = await fetch(
        `${API_URL}/users?email=${encodeURIComponent(email)}`
      );
      if (!checkUserResponse.ok) {
        throw new Error(
          `HTTP error checking user! Status: ${checkUserResponse.status}`
        );
      }
      const existingUsers = await checkUserResponse.json();

      if (existingUsers && existingUsers.length > 0) {
        throw new Error("User with this email already exists");
      }

      const newUserPayload = { email, password };
      const registerResponse = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserPayload),
      });

      if (!registerResponse.ok) {
        let errorBody;
        try {
          errorBody = await registerResponse.json();
        } catch (e) {
          errorBody = {
            message: `HTTP error! Status: ${registerResponse.status}`,
          };
        }
        throw new Error(
          errorBody.message ||
            `Registration failed with status: ${registerResponse.status}`
        );
      }

      const newUser = await registerResponse.json();

      setCurrentUser(newUser);
      localStorage.setItem("recipeAppUser", JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      console.error("Register error in AuthContext:", error.message);
      throw new Error(
        error.message || "Registration failed. Please try again."
      );
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("recipeAppUser");
  };

  const value = {
    currentUser,
    loadingAuth,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
