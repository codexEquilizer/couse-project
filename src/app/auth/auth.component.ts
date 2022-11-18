import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode: boolean = true;
    loginForm: FormGroup;

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

    fetchLogin() {
        // this.authService
    }

    onSubmit() {
        console.log(this.loginForm.value);
        this.fetchLogin();
    }
}