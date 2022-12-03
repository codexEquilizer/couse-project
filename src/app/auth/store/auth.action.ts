import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

//NOTE: Actions are objects based on class

//union type
export type auth_action_type = Login | Logout;

export class Login implements Action {
    public readonly type = LOGIN;
    constructor(public payload: User) { }
}

export class Logout implements Action {
    public readonly type = LOGOUT;
}