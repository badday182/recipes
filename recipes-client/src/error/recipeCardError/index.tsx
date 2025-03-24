import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RecipeCardError = ({ error }: { error: string }) => {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto min-w-xs">
        <CardHeader>
          <CardTitle className="text-2xl text-red-500">
            Error Loading Recipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecipeCardError;
