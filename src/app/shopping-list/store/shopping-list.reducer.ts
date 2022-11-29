import { Ingredient } from "../../shared/ingredient.model";
import * as  ShoppingListActions from "./shopping-list.action";

/* initial state  (Note state should be a JS object)*/
const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
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
        default:
            return state;
    }

}