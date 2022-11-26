import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

const routes: Routes = [
    { path: '', component: AuthComponent }
]

@NgModule({
    declarations: [AuthComponent],
    imports: [
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule        // SharedModule contains CommonModule so need to import CommonModule separately
    ]
})
export class AuthModule { }