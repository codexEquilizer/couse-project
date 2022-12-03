import { Ingredient } from "../../shared/ingredient.model";
import * as  ShoppingListActions from "./shopping-list.action";

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState {
    shoppingList: State;
}

/* initial state  (Note state should be a JS object)*/
const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null, //type-> Ingredient
    editedIngredientIndex: -1  //type-> number
}

/* Reducer */
// only for the first time when ngrx will initialize the state then it will be our initial state. So in the parameter I have written state=initialState such that if the value of state in null then it will take the initialState value by default
export function shoppingListReducer(state = initialState, action: ShoppingListActions.shopping_list_action_type) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            //need to return a new state
            //NOTE: State changes with ngrx will always have to be immutable. So we do not touch the current/existing state
            return {
                ...state,   // copy of the old/current state
                ingredients: [...state.ingredients, action.payload]
            }

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,   // copy of the old state
                ingredients: [...state.ingredients, ...action.payload]
            }

        case ShoppingListActions.UPDATE_INGREDIENT:
            // {am1 and 1, am2 and 2}
            const ingredient = state.ingredients[action.payload.index]; //am2 and 2
            const updatedIngredient = {
                ...ingredient,// am2, 2
                ...action.payload.ingredient
            }
            const updatedIngredients = [...state.ingredients]; //copy of old state ingredient
            updatedIngredients[action.payload.index] = updatedIngredient; //overwriting the existing element of the copy of old ingredient array with new ingredient element
            return {
                ...state,
                ingredients: updatedIngredients
            }

        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload;
                })
            }

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            }

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }

        default:
            return state;
    }

}