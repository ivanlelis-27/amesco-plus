import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ValidationService {
    validateLogin(email: string, password: string): string | null {
        // Simple email regex for demonstration
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !password) {
            return 'Invalid Email or Password\nPlease double-check the information you provided and try again.';
        }
        if (!emailRegex.test(email)) {
            return 'Invalid Email or Password\nPlease double-check the information you provided and try again.';
        }
        // Add your password validation logic here if needed
        if (password.length < 6) {
            return 'Invalid Email or Password\nPlease double-check the information you provided and try again.';
        }
        return null;
    }
}