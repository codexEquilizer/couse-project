import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            //take() rxjs operator Takes the first count values from the source, then completes.
            take(1),
            // takes the response from the first observable and then gives a new observable which we have inside the exhaustMap().
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                //modifying the outgoing request
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                })
                return next.handle(modifiedReq);
            })
        )
    }
}