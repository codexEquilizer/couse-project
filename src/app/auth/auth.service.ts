import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { environment } from "../../environments/environment";
import { Store } from "@ngrx/store";
import * as fromApp from '../global-Store/app.reducer';
import * as AuthActions from './store/auth.action';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    /* This will be handled in ngrx */
    //user = new BehaviorSubject<User>(null); // Using BehaviorSubject to get the immediate access to the previously emitted value
    tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private store: Store<fromApp.AppState>) { }

    signup(emailValue: string, pwdValue: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIkey, {
            email: emailValue,
            password: pwdValue,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    login(emailValue: string, pwdValue: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIkey, {
            email: emailValue,
            password: pwdValue,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            })
        );
    }

    /* Auto-Login functionality */
    autoLogin() {
        const localUserData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpiringDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        console.log('Data from Local Storage: ', localUserData);
        if (!localUserData) {
            return;
        }
        const loadedUser = new User(localUserData.email, localUserData.id, localUserData._token, new Date(localUserData._tokenExpiringDate));

        if (loadedUser.token) {
            // this.user.next(loadedUser); // handling in ngrx
            this.store.dispatch(new AuthActions.Login(loadedUser));

            // auto-logout when the user logs in
            const expirationDuration = new Date(localUserData._tokenExpiringDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    /* Handling the authentication of the User data  */
    private handleAuthentication(email: string, id: string, token: string, expirseIn: number) {
        //generating an expiration date
        const expirationDate = new Date(new Date().getTime() + (expirseIn * 1000));
        const userData = new User(email, id, token, expirationDate);
        /* Now handled by ngrx */
        // this.user.next(userData);
        this.store.dispatch(new AuthActions.Login(userData));

        // auto-logout when the user logs in
        this.autoLogout(expirseIn * 1000);  // converting sec to milisec

        // Adding userData local storage
        localStorage.setItem('userData', JSON.stringify(userData));
    }


    /* Handling common Error handling Logic for both login and signup */
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist!'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct!'
        }
        return throwError(errorMessage);
    }

    logout() {
        // this.user.next(null); // handling this via ngrx
        this.store.dispatch(new AuthActions.Logout());

        // Clearing the local storage when user logout
        localStorage.removeItem('userData');

        //Clearing the token expiration timer when we logout manually
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    /* Auto-Logout functionality */
    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
}