export class RegisterValidation {
    static isValidEmail(email: string): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    static passwordsMatch(password: string, confirmPassword: string): boolean {
        return password === confirmPassword;
    }
}
