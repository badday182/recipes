import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import RecipePage from "./pages/recipe/[id].tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/recipe/:recipeId" element={<RecipePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
