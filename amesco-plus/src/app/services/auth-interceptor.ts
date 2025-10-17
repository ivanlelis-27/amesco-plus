import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SessionService } from './session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private sessionService: SessionService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401 || err.status === 403) {
                    // Token invalid or session terminated on server — invalidate immediately
                    try {
                        this.sessionService.invalidateSession();
                    } catch (e) {
                        console.error('Failed to invalidate session from interceptor', e);
                    }
                }
                return throwError(() => err);
            })
        );
    }
}
