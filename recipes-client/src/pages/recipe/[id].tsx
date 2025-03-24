import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import RecipeCard from "@/components/custom/RecipeCard";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipePage() {
  const navigate = useNavigate();
  const { recipeId } = useParams();

  return (
    <>
      {/* <div className="container mx-auto py-8"> */}
      {recipeId && (
        <RecipeCard recipeId={recipeId} isCardinRecipesList={false} />
      )}
      <Button className="mt-3" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        Back to All Recipes
      </Button>
      {/* </div> */}
    </>
  );
}
