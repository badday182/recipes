import RecipesList from "@/components/RecipesList";
import { useAppDispatch, useAppSelector } from "@/store/hooks/reduxHooks";
import { fetchRecipes } from "@/store/slices/recipesSlice";
import { useEffect } from "react";

const Home = () => {
  const { items } = useAppSelector((state) => state.recipes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Only fetch recipes if the items array is empty
    if (items.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, items.length]);

  return <RecipesList />;
};

export default Home;
