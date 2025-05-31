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
        console.error(
          "AuthContext: Error parsing stored user from localStorage",
          error
        );
        localStorage.removeItem("recipeAppUser");
      }
    }
    setLoadingAuth(false);
  }, []);

  const login = async (email, password) => {
    // Тази функция ще я имплементираме в следващ къмит днес
    console.log(
      "AuthContext: Login function called (to be implemented with fetch):",
      email
    );
    return Promise.reject(
      new Error("Login functionality not fully implemented yet.")
    );
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
    console.log("AuthContext: User logged out and removed from localStorage");
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
