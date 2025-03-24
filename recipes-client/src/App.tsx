import "./App.css";
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
import RecipeCard from "./components/custom/RecipeCard";

function App() {
  const recipe = {
    meals: [
      {
        idMeal: "52771",
        strMeal: "Spicy Arrabiata Penne",
        strMealAlternate: null,
        strCategory: "Vegetarian",
        strArea: "Italian",
        strInstructions:
          "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        strTags: "Pasta,Curry",
        strYoutube: "https://www.youtube.com/watch?v=1IszT_guI08",
        strIngredient1: "penne rigate",
        strIngredient2: "olive oil",
        strIngredient3: "garlic",
        strIngredient4: "chopped tomatoes",
        strIngredient5: "red chilli flakes",
        strIngredient6: "italian seasoning",
        strIngredient7: "basil",
        strIngredient8: "Parmigiano-Reggiano",
        strIngredient9: "",
        strIngredient10: "",
        strIngredient11: "",
        strIngredient12: "",
        strIngredient13: "",
        strIngredient14: "",
        strIngredient15: "",
        strIngredient16: null,
        strIngredient17: null,
        strIngredient18: null,
        strIngredient19: null,
        strIngredient20: null,
        strMeasure1: "1 pound",
        strMeasure2: "1/4 cup",
        strMeasure3: "3 cloves",
        strMeasure4: "1 tin ",
        strMeasure5: "1/2 teaspoon",
        strMeasure6: "1/2 teaspoon",
        strMeasure7: "6 leaves",
        strMeasure8: "sprinkling",
        strMeasure9: "",
        strMeasure10: "",
        strMeasure11: "",
        strMeasure12: "",
        strMeasure13: "",
        strMeasure14: "",
        strMeasure15: "",
        strMeasure16: null,
        strMeasure17: null,
        strMeasure18: null,
        strMeasure19: null,
        strMeasure20: null,
        strSource: null,
        strImageSource: null,
        strCreativeCommonsConfirmed: null,
        dateModified: null,
      },
    ],
  };

  // const meal = recipe.meals[0] as {
  //   [key: string]: string | null;
  // };

  // // Parse ingredients and measurements into a clean array
  // const ingredients = [];
  // for (let i = 1; i <= 20; i++) {
  //   const ingredient = meal[`strIngredient${i}`];
  //   const measure = meal[`strMeasure${i}`];

  //   if (ingredient && ingredient.trim() !== "") {
  //     ingredients.push({
  //       name: ingredient,
  //       measure: measure || "",
  //     });
  //   }
  // }

  return (
    // <RecipeCard meals={recipe.meals} />
    <RecipeCard id={52772} />
    // <div className="container mx-auto p-4">
    //   <Card className="max-w-2xl mx-auto min-w-xs">
    //     <CardHeader>
    //       <div className="flex items-center justify-between">
    //         <div>
    //           <CardTitle className="text-2xl">{meal.strMeal}</CardTitle>
    //           <CardDescription className="flex gap-2 items-center mt-1">
    //             <ChefHat size={16} />
    //             <span>
    //               {meal.strArea} • {meal.strCategory}
    //             </span>
    //           </CardDescription>
    //         </div>
    //         <img
    //           src={meal.strMealThumb}
    //           alt={meal.strMeal}
    //           className="w-24 h-24 rounded-md object-cover"
    //         />
    //       </div>
    //       <div className="flex flex-wrap gap-2 mt-2">
    //         {meal.strTags?.split(",").map((tag) => (
    //           <Badge key={tag} variant="secondary">
    //             {tag}
    //           </Badge>
    //         ))}
    //       </div>
    //     </CardHeader>
    //     <CardContent>
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //         <div>
    //           <h3 className="text-lg font-medium mb-2">Ingredients</h3>
    //           <ul className="list-disc pl-5 space-y-1">
    //             {ingredients.map((item, idx) => (
    //               <li key={idx}>
    //                 {item.measure} {item.name}
    //               </li>
    //             ))}
    //           </ul>
    //         </div>

    //         <div>
    //           <h3 className="text-lg font-medium mb-2">Instructions</h3>
    //           <ScrollArea className="h-50 rounded-md border p-2">
    //             <p className="text-sm">{meal.strInstructions}</p>
    //           </ScrollArea>
    //         </div>
    //       </div>
    //     </CardContent>

    //     <CardFooter className="flex justify-between">
    //       <div className="text-sm text-muted-foreground">ID: {meal.idMeal}</div>
    //       <Button variant="outline" size="sm" asChild>
    //         <a
    //           href={meal.strYoutube}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="flex items-center gap-1"
    //         >
    //           <ExternalLink size={14} />
    //           Watch Video
    //         </a>
    //       </Button>
    //     </CardFooter>
    //   </Card>
    // </div>
  );
}

export default App;
