import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import RecipeCard from "@/components/custom/RecipeCard";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipePage() {
  const navigate = useNavigate();
  const { recipeId } = useParams();

  return (
    <>
      <header>
        <title>Recipe Details</title>
        <meta name="description" content="Detailed recipe information" />
      </header>

      <div className="container mx-auto py-8">
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          Back to recipes
        </Button>

        {recipeId && typeof recipeId === "string" && (
          <RecipeCard recipeId={recipeId} isCardinRecipesList={false} />
        )}
      </div>
    </>
  );
}
