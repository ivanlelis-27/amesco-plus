import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SessionService } from './services/session.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet]
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('amesco-plus');

  constructor(
    private sessionService: SessionService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeApp();
  }

  ngOnDestroy(): void {
    this.sessionService.stopSessionMonitoring();
  }

  private async initializeApp(): Promise<void> {
    // Check if user has a token
    const token = this.apiService.getToken();

    if (token) {
      // If token exists, check locally first for expiry
      const tokenValid = this.apiService.isTokenValid();
      if (!tokenValid) {
        // token expired or invalid locally — clear and redirect to welcome
        this.apiService.clearSession();
        this.router.navigate(['/welcome']);
        return;
      }

      // Token appears valid locally — validate session server-side
      const isSessionValid = await this.sessionService.validateCurrentSession();

      if (isSessionValid) {
        // Session is valid, start monitoring
        this.sessionService.startSessionMonitoring();

        // If user is on public landing, redirect to dashboard
        if (this.router.url === '/welcome' || this.router.url === '/') {
          this.router.navigate(['/dashboard']);
        }
      }
    } else {
      // No token, ensure user is on Welcome page
      const currentUrl = this.router.url;
      const publicPages = ['/welcome', '/login', '/register', '/membercheck', '/forgot-password', '/email-sent', '/privacy', '/terms'];

      if (!publicPages.some(page => currentUrl.startsWith(page))) {
        this.router.navigate(['/welcome']);
      }
    }
  }
}
