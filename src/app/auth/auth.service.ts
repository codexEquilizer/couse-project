import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { }

    signup(emailValue: string, pwdValue: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgh5B7vUbVbZ0ErQWH1rEgPhJFuxSeNjs', {
            email: emailValue,
            password: pwdValue,
            returnSecureToken: true
        });
    }
}