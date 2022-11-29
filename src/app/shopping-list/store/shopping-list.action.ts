import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';


/* Typescript feature, to basically tell that the type of ShoppingListActions can be either of the mentioned below: */
export type shopping_list_action_type = AddIngredient | AddIngredients;


/* Adding a single ingredient to the shopping ingredients list */
export class AddIngredient implements Action {
    public readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) { };
}

/* Adding the ingredients from recipe to the shopping ingredients list */
export class AddIngredients implements Action {
    public readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) { }
}