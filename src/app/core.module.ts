import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptor } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingService } from "./shopping-list/shopping.service";

@NgModule({
    providers: [
        ShoppingService,
        RecipeService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
    // We don't need to export our services.
})
export class CoreModule { }