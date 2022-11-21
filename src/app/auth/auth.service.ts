import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

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
    user = new BehaviorSubject<User>(null); // Using BehaviorSubject to get the immediate access to the previously emitted value

    constructor(private http: HttpClient) { }

    signup(emailValue: string, pwdValue: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgh5B7vUbVbZ0ErQWH1rEgPhJFuxSeNjs', {
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
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgh5B7vUbVbZ0ErQWH1rEgPhJFuxSeNjs', {
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
            this.user.next(loadedUser);
        }
    }

    /* Handling the authentication of the User data  */
    private handleAuthentication(email: string, id: string, token: string, expirseIn: number) {
        //generating an expiration date
        const expirationDate = new Date(new Date().getTime() + (expirseIn * 1000));
        const userData = new User(email, id, token, expirationDate);
        this.user.next(userData);

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
        this.user.next(null);
    }
}