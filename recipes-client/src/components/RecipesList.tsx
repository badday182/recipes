import { useAppDispatch, useAppSelector } from "@/store/hooks/reduxHooks";
import RecipeCard from "./custom/RecipeCard";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchRecipes,
  fetchRecipesByCategory,
} from "@/store/slices/recipesSlice";
import PaginationControl from "./custom/PaginationControl";

const ITEMS_PER_PAGE = 12;

const RecipesList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.recipes);
  const { items: categories } = useAppSelector((state) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Handle category change
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All categories") {
      dispatch(fetchRecipesByCategory(selectedCategory));
    } else {
      dispatch(fetchRecipes());
    }
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory, dispatch]);

  if (loading === "pending") {
    return <div>Loading recipes...</div>;
  }

  if (loading === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="mb-6 min-w-screen">
        <Select onValueChange={setSelectedCategory} value={selectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All categories">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="container min-h-screen">
        <div className="recipes-container flex flex-wrap justify-evenly gap-3">
          {currentItems.map((recipe) => (
            <div className="h-full" key={recipe.idMeal}>
              <RecipeCard recipeId={recipe.idMeal} isCardinRecipesList={true} />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default RecipesList;
