import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.user.pipe(
            take(1),    // we are using this take rxjs method so that it only takes the lates user and don't have an ongoing user subscription
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