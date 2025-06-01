import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:3001";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recipeId) return;

    const fetchRecipeDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/recipes/${recipeId}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Recipe not found.");
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message || "Could not load recipe details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (isLoading) {
    return <p>Loading recipe details...</p>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>Error: {error}</p>
        <Link to="/recipes">Back to all recipes</Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/recipes">Back to all recipes</Link>
      </div>
    );
  }

  const ingredientsList = recipe.ingredients
    ? recipe.ingredients.split("\n").filter((item) => item.trim() !== "")
    : [];
  const instructionsList = recipe.instructions
    ? recipe.instructions.split("\n").filter((item) => item.trim() !== "")
    : [];

  return (
    <div className="recipe-detail-page">
      <h2>{recipe.title}</h2>

      <h4>Ingredients:</h4>
      {ingredientsList.length > 0 ? (
        <ul>
          {ingredientsList.map((item, index) => (
            <li key={`ing-${index}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients listed.</p>
      )}

      <h4>Instructions:</h4>
      {instructionsList.length > 0 ? (
        <ol>
          {instructionsList.map((item, index) => (
            <li key={`inst-${index}`}>{item}</li>
          ))}
        </ol>
      ) : (
        <p>No instructions provided.</p>
      )}

      {recipe.createdAt && (
        <p>
          <small>
            Posted on: {new Date(recipe.createdAt).toLocaleDateString()}
          </small>
        </p>
      )}
      <Link to="/recipes">Back to all recipes</Link>
    </div>
  );
};

export default RecipeDetailPage;
