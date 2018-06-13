import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,

    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
    constructor(private router:Router){
        
    }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        debugger;
        const customReq = request.clone({
            headers: request.headers.set('Authorization', 'Basic ' + localStorage.getItem('currentUserToken'))
        });
        return next.handle(customReq).pipe(tap(
            (event: HttpEvent<any>) => { },
            (error: any) => {
                debugger;
                if (error instanceof HttpErrorResponse) {
                    if (error.status == 404) {
                        return 'Employee does not found';


                    } if (error.status == 200) {

                        return 'Deleted Successfully';

                    }
                    if( error.status==0){
                        
                        this.router.navigate(['/login'])
                    }
                    if (error.status == 401  ) {
                        alert(error.error)
                     this.router.navigate(['/login'])
                    }

                    if (error.status == 501) {
                        console.error(error)
                    }
                    return throwError(error);
                }
            }
        ));


        // .pipe(
        //     catchError(response => {
        //         debugger
        //         if (response instanceof HttpErrorResponse) {
        //             debugger
        //           console.log('Processing http error', response);
        //         }


        //         return throwError(response);
        //       })

        // );
    }
    private handleError(error: HttpErrorResponse) {

        debugger;
        if (error.error instanceof ErrorEvent) {
            debugger;
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            debugger;
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,

            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(error)
            ;
    };
}