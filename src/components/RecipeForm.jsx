import React, { useState, useEffect } from "react";

const RecipeForm = ({ onSubmit, isLoading, initialData = null }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setIngredients(initialData.ingredients || "");
      setInstructions(initialData.instructions || "");
    } else {
      setTitle("");
      setIngredients("");
      setInstructions("");
    }
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !ingredients || !instructions) {
      alert("Please fill in Title, Ingredients, and Instructions.");
      return;
    }
    onSubmit({ title, ingredients, instructions });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="recipe-title">Title:</label>
        <input
          type="text"
          id="recipe-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div>
        <label htmlFor="recipe-ingredients">Ingredients (one per line):</label>
        <textarea
          id="recipe-ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows="6"
          disabled={isLoading}
          required
        />
      </div>
      <div>
        <label htmlFor="recipe-instructions">
          Instructions (one per line):
        </label>
        <textarea
          id="recipe-instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows="10"
          disabled={isLoading}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading
          ? initialData
            ? "Updating..."
            : "Creating..."
          : initialData
          ? "Update Recipe"
          : "Create Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
