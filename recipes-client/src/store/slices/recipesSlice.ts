import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Recipe interface and state
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

interface RecipesState {
  items: Recipe[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialRecipesState: RecipesState = {
  items: [],
  loading: "idle",
  error: null,
};

// Fetch Recipes
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const categoriesResponse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const categoriesData = await categoriesResponse.json();
    const firstCategory = categoriesData.categories[0].strCategory;
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${firstCategory}`
    );
    const data = await response.json();
    // return data.meals.slice(0, 20);
    return data.meals;
  }
);

// Fetch Recipes by Category
export const fetchRecipesByCategory = createAsyncThunk(
  "recipes/fetchRecipesByCategory",
  async (category: string) => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    if (response.data && response.data.meals) {
      return response.data.meals;
    }
    return [];
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: initialRecipesState,
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
      })
      // Add the new cases for fetchRecipesByCategory
      .addCase(fetchRecipesByCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchRecipesByCategory.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchRecipesByCategory.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          action.error.message || "Failed to fetch recipes by category";
      });
  },
});

// Category interface and state
interface Category {
  strCategory: string;
}

interface CategoriesState {
  items: string[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialCategoriesState: CategoriesState = {
  items: [],
  loading: "idle",
  error: null,
};

// Fetch Categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    );
    if (response.data && response.data.meals) {
      return response.data.meals.map((cat: Category) => cat.strCategory);
    }
    return [];
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialCategoriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export const recipesReducer = recipesSlice.reducer;
export const categoriesReducer = categoriesSlice.reducer;
