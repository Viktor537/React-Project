import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>{truncateText(recipe.ingredients, 100)}</p>
      <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
    </div>
  );
};

export default RecipeCard;
