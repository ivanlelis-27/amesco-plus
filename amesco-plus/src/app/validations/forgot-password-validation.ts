import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordValidationService {
    validateEmail(email: string): string | null {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return null;
    }
}