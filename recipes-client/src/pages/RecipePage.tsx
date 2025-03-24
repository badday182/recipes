import RecipeCard from "@/components/custom/RecipeCard";

const RecipePage = (recipeId: string) => {
  return <RecipeCard recipeId={recipeId} isCardinRecipesList={true} />;
};

export default RecipePage;
