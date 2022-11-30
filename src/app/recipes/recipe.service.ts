import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipes.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.action'
import * as fromShoppingListReducer from '../shopping-list/store/shopping-list.reducer';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();

    /* private recipes: Recipe[] = [
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
    ]; */
    private recipes: Recipe[] = [];

    //Injecting shoppingService to the RecipeService
    constructor(private shoppingService: ShoppingService, private store: Store<fromShoppingListReducer.AppState>) { }

    // This method will recipes the recipes by the fetchRecipes() from the dataStorageService
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // this.shoppingService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}