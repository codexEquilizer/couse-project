import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const routes: Routes = [
    { path: '', component: ShoppingListComponent },
]


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export class ShoppingListModule { }