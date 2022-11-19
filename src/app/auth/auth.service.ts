import { HttpClient } from "@angular/common/http";
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
            catchError(errorRes => {
                let errorMessage = 'An unknown error occured!';
                if (!errorRes.error || !errorRes.error.error) {
                    const err = new Error(errorMessage); // since throwError(errorMessage) is deprecated, we are using this technique but the process is same!
                    return throwError(() => err);
                }
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exists already!';
                }
                return throwError(() => errorMessage);
            })
        )
    }

    login(emailValue: string, pwdValue: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgh5B7vUbVbZ0ErQWH1rEgPhJFuxSeNjs', {
            email: emailValue,
            password: pwdValue,
            returnSecureToken: true
        });
    }
}