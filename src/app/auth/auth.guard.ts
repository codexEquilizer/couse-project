import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../global-Store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.select('auth').pipe(
            take(1),    // we are using this take rxjs method so that it only takes the lates user and don't have an ongoing user subscription
            map(authState => {
                return authState.user;
            }),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/auth']);
                }
            })
        );
    }
}

/*
return this.authService.user.pipe(
    map(user => {
        return !!user;
    }),
    //...... We can follow this approach for navigating or we can use URLTree which is native to CanActivate interface 
    // tap(isAuth => {
    //     if (!isAuth) {
    //         this.router.navigate(['/auth']);
    //     }
    // })

*/