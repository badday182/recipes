import {
  Category,
  initialCategoriesState,
  initialRecipesState,
  Recipe,
} from "@/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Recipes
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    try {
      // Get all categories first
      const categoriesResponse = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const categoriesData = await categoriesResponse.json();
      const categories = categoriesData.categories.map(
        (cat: any) => cat.strCategory
      );

      // Fetch recipes from all categories
      const promises = categories.map(async (category: string) => {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const data = await response.json();
        return data.meals || [];
      });

      // Wait for all requests to complete
      const allCategoriesResults = await Promise.all(promises);

      // Combine all recipes into a single array
      const allRecipes = allCategoriesResults.flat();

      return allRecipes;
    } catch (error) {
      console.error("Error fetching all recipes:", error);
      throw error;
    }
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
