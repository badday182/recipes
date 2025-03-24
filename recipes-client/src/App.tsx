import { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppDispatch, useAppSelector } from "./store/hooks/reduxHooks";
import { fetchRecipes } from "./store/slices/recipesSlice";
import RecipesList from "./components/RecipesList";

function AppContent() {
  const { items } = useAppSelector((state) => state.recipes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Only fetch recipes if the items array is empty
    if (items.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, items.length]);

  return <RecipesList />;
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
