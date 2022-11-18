import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode: boolean = true;
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
        if (!this.loginForm) {
            return;
        }
        this.email = this.loginForm.value.form_login_id.loginId;
        this.password = this.loginForm.value.form_password.password;

        if (this.isLoginMode) {
            //..login login
        } else {
            //signup logic
            this.authService.signup(this.email, this.password).subscribe(
                resData => {
                    console.log(resData);
                },
                error => {
                    console.log(error);
                }
            )
        }

        this.loginForm.reset();
    }
}