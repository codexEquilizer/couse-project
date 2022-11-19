import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";

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

    constructor(private authService: AuthService) { }

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

        this.isLoading = true;
        if (this.isLoginMode) {
            //..login login
        } else {
            //signup logic
            this.authService.signup(this.email, this.password).subscribe(
                resData => {
                    console.log(resData);
                    this.isLoading = false;
                },
                errorMessage => {
                    console.log(errorMessage);
                    this.error = errorMessage;
                    this.isLoading = false;
                }
            )
        }

        this.loginForm.reset();
    }
}