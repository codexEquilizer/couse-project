import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipes.model";

@Injectable({ providedIn: 'root' })
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipe: Recipe[] = [
        new Recipe('Malai Kofta',
            'Recipe description 1',
            'https://www.bibbyskitchenat36.com/wp-content/uploads/2021/01/DSC_9104-1.jpg',
            [
                new Ingredient('Amul Cream', 1),
                new Ingredient('Mix Vegitables', 20),
                new Ingredient('Meat balls', 10)
            ]),
        new Recipe('Speggeti',
            'Another Recipe description 2',
            'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?resize=960,872?quality=90&webp=true&resize=375,341',
            [
                new Ingredient('Noodles', 2),
                new Ingredient('Capsicunms', 10)
            ])
    ];

    //Injecting shoppingService to the RecipeService
    constructor(private shoppingService: ShoppingService) { }

    getRecipes() {
        return this.recipe.slice();
    }

    getRecipe(id: number) {
        return this.recipe[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingService.addIngredients(ingredients);
    }
}