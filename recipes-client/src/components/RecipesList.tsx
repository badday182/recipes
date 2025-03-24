import { useAppSelector } from "@/store/hooks/reduxHooks";
import RecipeCard from "./custom/RecipeCard";

const RecipesList = () => {
  const { items, loading, error } = useAppSelector((state) => state.recipes);

  if (loading === "pending") {
    return <div>Loading recipes...</div>;
  }

  if (loading === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recipes-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
      {items.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipeId={recipe.idMeal}
          isCardinRecipesList={true}
        />
      ))}
    </div>
  );
};

export default RecipesList;
