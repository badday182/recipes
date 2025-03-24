import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer, categoriesReducer } from "./slices/recipesSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    categories: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
