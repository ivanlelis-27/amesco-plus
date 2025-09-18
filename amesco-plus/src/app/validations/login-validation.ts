import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidationService {
    validateLogin(email: string, password: string): string | null {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !password) {
            return 'Invalid Email or Password\nPlease double-check the information you provided and try again.';
        }
        if (!emailRegex.test(email)) {
            return 'Invalid Email or Password\nPlease double-check the information you provided and try again.';
        }
        if (password.length < 6) {
            return 'Invalid Email or Password\nPlease double-check the information you provided and try again.';
        }
        return null;
    }
}