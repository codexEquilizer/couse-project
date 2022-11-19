import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

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

    constructor(private http: HttpClient) { }

    signup(emailValue: string, pwdValue: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgh5B7vUbVbZ0ErQWH1rEgPhJFuxSeNjs', {
            email: emailValue,
            password: pwdValue,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError)
        )
    }

    login(emailValue: string, pwdValue: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgh5B7vUbVbZ0ErQWH1rEgPhJFuxSeNjs', {
            email: emailValue,
            password: pwdValue,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError)
        )
    }

    // Handling common Error handling Logic for both login and signup
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
}