import { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useAppDispatch } from "./store/hooks/reduxHooks";
import { fetchRecipes } from "./store/slices/recipesSlice";
import RecipesList from "./components/RecipesList";

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

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
