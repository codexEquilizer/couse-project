import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

/* Typescript feature, to basically tell that the type of ShoppingListActions can be either of the mentioned below: */
export type shopping_list_action_type = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;


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

export class UpdateIngredient implements Action {
    public readonly type = UPDATE_INGREDIENT;
    constructor(public payload: { index: number, ingredient: Ingredient }) { }
}

export class DeleteIngredient implements Action {
    public readonly type = DELETE_INGREDIENT;
    constructor(public payload: number) { }
}

export class StartEdit implements Action {
    public readonly type = START_EDIT;
    constructor(public payload: number) { }
}

export class StopEdit implements Action {
    public readonly type = STOP_EDIT;
    // this don't needs a payload because we will just reset the value of editedIngredient and editedIngredientIndex
}