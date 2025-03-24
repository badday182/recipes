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
    <div className="recipes-container flex flex-wrap justify-evenly gap-3">
      {items.map((recipe) => (
        <div className="h-full">
          <RecipeCard
            key={recipe.idMeal}
            recipeId={recipe.idMeal}
            isCardinRecipesList={true}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipesList;
