import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { catchError, of, tap } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
    private sessionCheckInterval: any;
    // shorten the polling interval to 2s to make invalidation detection near-instant
    // if SSE / push is not available. Change with care (tradeoff: more requests).
    private readonly SESSION_CHECK_INTERVAL = 2000; // Check every 2 seconds
    private eventSource: any | null = null;

    constructor(
        private apiService: ApiService,
        private router: Router
        ,
        private toastService: ToastService
    ) { }

    startSessionMonitoring(): void {
        // Clear any existing interval
        this.stopSessionMonitoring();

        // Only start monitoring if user has a token
        if (this.apiService.getToken()) {
            // Start server-sent-events listener for instant invalidation (browser only)
            this.startSseListener();

            // run an immediate check and then start the interval as fallback
            this.checkAndValidateSession();
            this.sessionCheckInterval = setInterval(() => {
                this.checkAndValidateSession();
            }, this.SESSION_CHECK_INTERVAL);
        }
    }

    stopSessionMonitoring(): void {
        if (this.sessionCheckInterval) {
            clearInterval(this.sessionCheckInterval);
            this.sessionCheckInterval = null;
        }
        // close SSE if open
        if (this.eventSource) {
            try {
                this.eventSource.close();
            } catch (e) {
                // ignore
            }
            this.eventSource = null;
        }
    }

    private checkAndValidateSession(): void {
        if (!this.apiService.getToken()) {
            this.stopSessionMonitoring();
            return;
        }

        this.apiService.checkSessionStatus().pipe(
            catchError(error => {
                console.log('Session check failed:', error);
                // If the request fails (401, 403, etc.), treat as invalid session
                this.handleInvalidSession();
                return of({ isValid: false });
            }),
            tap(response => {
                if (!response.isValid) {
                    this.handleInvalidSession();
                }
            })
        ).subscribe();
    }

    // SSE: Server-Sent Events listener to get instant session invalidation notifications.
    // Backend should expose an SSE endpoint that sends an event when the user's session is invalidated.
    private startSseListener(): void {
        // Only run in browser
        if (typeof window === 'undefined' || typeof window.EventSource === 'undefined') return;

        // If already open, do nothing
        if (this.eventSource) return;

        const user = this.apiService.getUserFromToken();
        const userId = user?.memberId || user?.sub || null;
        if (!userId) return;

        try {
            // Use a relative path so it works across environments; backend must implement this
            const url = `/api/sessions/events?userId=${encodeURIComponent(userId)}`;
            this.eventSource = new EventSource(url);

            this.eventSource.addEventListener('open', () => {
                console.log('SSE session listener connected');
            });

            this.eventSource.addEventListener('message', (evt: any) => {
                // Expect server to send JSON or simple 'invalid' message
                try {
                    const data = evt.data;
                    if (!data) return;
                    let parsed = null;
                    try { parsed = JSON.parse(data); } catch { parsed = data; }

                    if ((parsed && parsed.type === 'session-invalidated') || parsed === 'session-invalidated' || parsed === 'invalid') {
                        console.log('SSE: session invalidated event received');
                        this.handleInvalidSession();
                    }
                } catch (e) {
                    console.error('Error handling SSE session message', e);
                }
            });

            this.eventSource.addEventListener('error', (err: any) => {
                // If SSE fails, close it and fall back to polling
                console.warn('SSE session listener error, falling back to polling', err);
                try { this.eventSource.close(); } catch { }
                this.eventSource = null;
            });
        } catch (e) {
            console.warn('Failed to start SSE session listener', e);
            this.eventSource = null;
        }
    }

    private handleInvalidSession(): void {
        console.log('Session invalid - logging out and redirecting to welcome');
        this.stopSessionMonitoring();
        this.apiService.clearSession();
        // show a toast explaining why the user was logged out
        // store a flag so the welcome page can display a toast after redirect
        try {
            if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
                window.sessionStorage.setItem('session_invalidated', '1');
            }
        } catch (e) {
            // ignore
        }

        // prefer immediate navigation that doesn't wait for Angular change detection
        try {
            if (typeof window !== 'undefined' && window.location) {
                // replace so back button doesn't return to invalid state
                window.location.replace('/welcome');
                return;
            }
        } catch (e) {
            // fallback to router navigation
        }

        this.router.navigate(['/welcome']);
    }

    // Public wrapper so other parts (like an HTTP interceptor) can force invalidation
    invalidateSession(): void {
        this.handleInvalidSession();
    }

    // Call this method when user logs in successfully
    onUserLogin(): void {
        this.startSessionMonitoring();
    }

    // Call this method when user logs out
    onUserLogout(): void {
        this.stopSessionMonitoring();
    }

    // Check session immediately (useful for app initialization)
    validateCurrentSession(): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this.apiService.getToken()) {
                resolve(false);
                return;
            }

            this.apiService.checkSessionStatus().pipe(
                catchError(() => {
                    this.handleInvalidSession();
                    resolve(false);
                    return of({ isValid: false });
                }),
                tap(response => {
                    if (!response.isValid) {
                        this.handleInvalidSession();
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                })
            ).subscribe();
        });
    }
}