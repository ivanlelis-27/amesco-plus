import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { PrivacyComponent } from './pages/privacy/privacy';
import { Membercheck } from './pages/membercheck/membercheck';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: Welcome },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'membercheck', component: Membercheck },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'dashboard', component: Dashboard },
];
