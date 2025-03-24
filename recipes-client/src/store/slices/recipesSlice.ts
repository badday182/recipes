import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  // Add other fields you need
}

interface RecipesState {
  items: Recipe[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RecipesState = {
  items: [],
  loading: "idle",
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    // First fetch all categories
    const categoriesResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const categoriesData = await categoriesResponse.json();

    // Get first category to fetch meals from
    const firstCategory = categoriesData.categories[0].strCategory;

    // Fetch meals from the first category
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${firstCategory}`
    );
    const data = await response.json();

    // Return only first 20 meals
    return data.meals.slice(0, 20);
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default recipesSlice.reducer;
