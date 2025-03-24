import { useAppSelector } from "@/store/hooks/reduxHooks";
import RecipeCard from "./custom/RecipeCard";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const RecipesList = () => {
  const { items, loading, error } = useAppSelector((state) => state.recipes);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState(items);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        if (response.data && response.data.meals) {
          const categoryList = response.data.meals.map(
            (cat: { strCategory: string }) => cat.strCategory
          );
          setCategories(categoryList);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Filter recipes when category changes
  useEffect(() => {
    if (!selectedCategory || selectedCategory === "All categories") {
      setFilteredItems(items);
      return;
    }

    const fetchRecipesByCategory = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );
        if (response.data && response.data.meals) {
          setFilteredItems(response.data.meals);
        }
      } catch (error) {
        console.error("Error fetching recipes by category:", error);
      }
    };

    fetchRecipesByCategory();
  }, [selectedCategory, items]);

  if (loading === "pending") {
    return <div>Loading recipes...</div>;
  }

  if (loading === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    // <div className="w-full min-h-screen">
    <div className="min-w-screen min-h-screen">
      <div className="mb-6 max-w-xs">
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

      <div className="recipes-container flex flex-wrap justify-evenly gap-3">
        {filteredItems.map((recipe) => (
          <div className="h-full" key={recipe.idMeal}>
            <RecipeCard recipeId={recipe.idMeal} isCardinRecipesList={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesList;
