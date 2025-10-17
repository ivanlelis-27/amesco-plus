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
      // Validate the current session
      const isSessionValid = await this.sessionService.validateCurrentSession();

      if (isSessionValid) {
        // Session is valid, start monitoring
        this.sessionService.startSessionMonitoring();

        // Only redirect automatically if the user previously opted into auto-login
        // (set localStorage 'autoLogin' = 'true' at login time). This prevents
        // unexpected automatic sign-in on app start.
        const autoLogin = (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined')
          ? localStorage.getItem('autoLogin') === 'true'
          : false;
        if (autoLogin && (this.router.url === '/welcome' || this.router.url === '/')) {
          this.router.navigate(['/dashboard']);
        }
      }
      // If session is invalid, validateCurrentSession already handles redirect to welcome
    } else {
      // No token, ensure user is on a public page
      const currentUrl = this.router.url;
      const publicPages = ['/welcome', '/login', '/register', '/membercheck', '/forgot-password', '/email-sent', '/privacy', '/terms'];

      if (!publicPages.some(page => currentUrl.startsWith(page))) {
        this.router.navigate(['/welcome']);
      }
    }
  }
}
