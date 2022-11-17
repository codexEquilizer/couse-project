import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipes.model";

@Injectable({ providedIn: "root" })
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    //HTTP request
    saveRecipes() {
        const recipes = this.recipeService.getRecipes();
        //NOTE: using PUT as we are storing all my recipes and also want to overwrite any previous recipes that I stored.
        this.http.put('https://ng-course-recipebook-101cd-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(responseBody => {
            console.log('Saved Recipes ', responseBody);
        })
    }

    fetchRecipes() {
        //http response
        return this.http.get<Recipe[]>('https://ng-course-recipebook-101cd-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    })
                }),
                tap(recipes => {
                    console.log('Setting recipe after fetching: ');
                    this.recipeService.setRecipes(recipes);
                })
            )
    }

}