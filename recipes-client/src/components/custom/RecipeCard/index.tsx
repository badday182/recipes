import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChefHat } from "lucide-react";
import { useEffect, useState } from "react";
import { RecipeCardProps } from "@/types";
import { DefaultRecipe } from "@/constants";
import RecipeCardError from "@/error/recipeCardError";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({
  recipeId,
  isCardinRecipesList = false,
}: RecipeCardProps) => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(DefaultRecipe);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch recipe (Status: ${response.status})`
          );
        }

        const data = await response.json();

        if (data.meals === null) {
          throw new Error(`No recipe found with ID: ${recipeId}`);
        }

        setRecipe(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  // Handle error state
  if (error) {
    return <RecipeCardError error={"An unknown error occurred"} />;
  }

  const meal =
    (recipe.meals?.[0] as {
      [key: string]: string | null;
    }) || DefaultRecipe.meals[0];

  // Parse ingredients and measurements into a clean array
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient,
        measure: measure || "",
      });
    }
  }

  // Add this function to handle card click
  const handleCardClick = () => {
    if (isCardinRecipesList) {
      navigate(`/recipe/${recipeId}`);
    }
  };

  // Wrap the Card with onClick when it's in recipe list
  const CardComponent = (
    <Card
      className={clsx("max-w-2xl mx-auto min-w-xs", {
        "max-w-xs": isCardinRecipesList,
        "cursor-pointer hover:shadow-md transition-shadow": isCardinRecipesList,
      })}
      onClick={isCardinRecipesList ? handleCardClick : undefined}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl p-1">{meal.strMeal}</CardTitle>
            <CardDescription className="flex gap-2 items-center mt-1">
              <ChefHat size={16} />
              <span>
                {meal.strArea} • {meal.strCategory}
              </span>
            </CardDescription>
          </div>
          {meal.strMealThumb && (
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal || "Recipe image"}
              className="w-24 h-24 rounded-md object-cover"
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {meal.strTags?.split(",").map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      {!isCardinRecipesList && (
        <>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-pulse text-center">
                  <p>Loading recipe details...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Ingredients</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {ingredients.map((item, idx) => (
                      <li key={idx}>
                        {item.measure} {item.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Instructions</h3>
                  <ScrollArea className="h-50 rounded-md border p-2">
                    <p className="text-sm">{meal.strInstructions}</p>
                  </ScrollArea>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {/* <div className="text-sm text-muted-foreground">
              ID: {meal.idMeal}
            </div> */}
            {meal.strYoutube && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  Watch Video
                </a>
              </Button>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );

  return CardComponent;
};

export default RecipeCard;
