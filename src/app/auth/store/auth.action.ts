import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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