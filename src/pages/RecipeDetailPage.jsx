import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = "http://localhost:3001";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteRecipe = async () => {
    if (!recipe || !currentUser || currentUser.id !== recipe.userId) {
      setError("You are not authorized to delete this recipe.");
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to delete this recipe? This action cannot be undone."
      )
    ) {
      setIsDeleting(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/recipes/${recipe.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        navigate("/recipes");
      } catch (err) {
        setError(err.message || "Could not delete recipe.");
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return <p>Loading recipe details...</p>;
  }

  if (error && !recipe) {
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
        <p>Recipe data is not available.</p>
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

      {currentUser && recipe && currentUser.id === recipe.userId && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleDeleteRecipe}
            disabled={isDeleting}
            className="delete-recipe-button"
          >
            {isDeleting ? "Deleting..." : "Delete Recipe"}
          </button>
        </div>
      )}
      {error && recipe && (
        <p style={{ color: "red", marginTop: "10px" }}>Error: {error}</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <Link to="/recipes">Back to all recipes</Link>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
