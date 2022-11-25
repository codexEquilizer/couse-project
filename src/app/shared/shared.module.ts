import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppAlertComponent } from "./alert/app-alert/app-alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        AppAlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AppAlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule
    ],
})
export class SharedModule { }