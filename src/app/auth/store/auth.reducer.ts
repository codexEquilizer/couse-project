import { User } from '../user.model';

import * as AuthActions from './auth.action';

export interface State {
    user: User;
}

const initialState: State = {
    user: null
}

export function authReducer(state = initialState, action: AuthActions.auth_action_type) {
    switch (action.type) {
        case AuthActions.LOGIN:
            return {
                ...state,
                user: action.payload
            }

        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
}