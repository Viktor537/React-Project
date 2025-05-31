import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard.jsx";

const API_URL = "http://localhost:3001";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/recipes`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message || "Could not load recipes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (isLoading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.length > 0 ? (
        <div className="recipe-list-container">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p>No recipes found. Perhaps add one?</p>
      )}
    </div>
  );
};

export default RecipesPage;
