export interface RecipeCardProps {
  recipeId: string;
  isCardinRecipesList: boolean;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export interface RecipesState {
  items: Recipe[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

export const initialRecipesState: RecipesState = {
  items: [],
  loading: "idle",
  error: null,
};

export interface Category {
  strCategory: string;
}

export interface CategoriesState {
  items: string[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

export const initialCategoriesState: CategoriesState = {
  items: [],
  loading: "idle",
  error: null,
};
