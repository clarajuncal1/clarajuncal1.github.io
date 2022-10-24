import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

type NewType = Observable<HttpEvent<any>>;

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): NewType {
        const headers = new HttpHeaders().set('Authorization', `Client-ID ${environment.accessKey}`);
        req = req.clone({ headers });
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status !== 200) {
                    console.error(`${error.status}`);
                }
                return throwError(error);
            })
        );
    }
}