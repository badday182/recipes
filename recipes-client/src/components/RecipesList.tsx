import { useAppDispatch, useAppSelector } from "@/store/hooks/reduxHooks";
import RecipeCard from "./custom/RecipeCard";
import { useEffect, useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";

const ITEMS_PER_PAGE = 12;

const RecipesList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.recipes);
  const { items: categories } = useAppSelector((state) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Set up debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setDebouncedSearchQuery(query);
        setCurrentPage(1); // Reset to first page on search
      }, 2000),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return items;

    return items.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [items, debouncedSearchQuery]);

  // Calculate pagination values
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Handle category change
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "All categories") {
      dispatch(fetchRecipesByCategory(selectedCategory));
    } else {
      dispatch(fetchRecipes());
    }
    setCurrentPage(1); // Reset to first page when category changes
    setSearchQuery(""); // Clear search when category changes
    setDebouncedSearchQuery(""); // Clear debounced search
  }, [selectedCategory, dispatch]);

  if (loading === "pending") {
    return <div>Loading recipes...</div>;
  }

  if (loading === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* <div className="mb-6 space-y-4"> */}
      <div className="mb-6 min-w-screen flex gap-2">
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

        <Input
          type="search"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-3xs"
        />
      </div>

      <div className="container min-h-screen">
        {totalItems === 0 ? (
          <div className="text-center py-10">
            No recipes found matching your search.
          </div>
        ) : (
          <div className="recipes-container flex flex-wrap justify-evenly gap-3">
            {currentItems.map((recipe) => (
              <div className="h-full" key={recipe.idMeal}>
                <RecipeCard
                  recipeId={recipe.idMeal}
                  isCardinRecipesList={true}
                />
              </div>
            ))}
          </div>
        )}

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
