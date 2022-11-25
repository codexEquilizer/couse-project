import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode: boolean = true;
    isLoading: boolean;
    error: string = null;

    loginForm: FormGroup;
    email: string;
    password: string;

    constructor(private authService: AuthService, private router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            'form_login_id': new FormGroup({
                'loginId': new FormControl(null, [Validators.required, Validators.email])
            }),
            'form_password': new FormGroup({
                'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
            })
        });
    }

    onSubmit() {
        // console.log(this.loginForm.value);
        // Guard clause
        if (!this.loginForm) {
            return;
        }
        this.email = this.loginForm.value.form_login_id.loginId;
        this.password = this.loginForm.value.form_password.password;

        // Adding this observable to avoid repeating the same logic code for both login and signup
        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode) {
            //..login login
            authObs = this.authService.login(this.email, this.password);
        } else {
            //signup logic
            authObs = this.authService.signup(this.email, this.password);
        }

        //This holds the logic of subscribing to the logic of login/signup and giving the respective response or errorMessage.
        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            }
        )

        this.loginForm.reset();
    }

    onCloseAlert() {
        this.error = null;
    }
}