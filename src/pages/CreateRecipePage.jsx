import React from "react";
import { Link } from "react-router-dom";

const CreateRecipePage = () => {
  return (
    <div>
      <h2>Create New Recipe</h2>
      <p>This page is for creating new recipes. The form will be added soon!</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default CreateRecipePage;
