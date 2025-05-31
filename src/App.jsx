import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RecipesPage from "./pages/RecipesPage.jsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.jsx";
import CreateRecipePage from "./pages/CreateRecipePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/create-recipe" element={<CreateRecipePage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
