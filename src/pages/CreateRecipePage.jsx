import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import RecipeForm from "../components/RecipeForm.jsx";

const API_URL = "http://localhost:3001";

const CreateRecipePage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCreateRecipeSubmit = async (recipeData) => {
    if (!currentUser) {
      setError("You must be logged in to create a recipe.");
      navigate("/login");
      return;
    }

    setError("");
    setIsLoading(true);

    const newRecipePayload = {
      ...recipeData,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipePayload),
      });

      if (!response.ok) {
        let errorBody;
        try {
          errorBody = await response.json();
        } catch (e) {
          errorBody = { message: `HTTP error! Status: ${response.status}` };
        }
        throw new Error(
          errorBody.message ||
            `Failed to create recipe with status: ${response.status}`
        );
      }

      const newRecipe = await response.json();
      navigate(`/recipes/${newRecipe.id}`);
    } catch (err) {
      setError(err.message || "Could not create recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Recipe</h2>
      <RecipeForm onSubmit={handleCreateRecipeSubmit} isLoading={isLoading} />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!error && <Link to="/">Back to Home</Link>}
    </div>
  );
};

export default CreateRecipePage;
