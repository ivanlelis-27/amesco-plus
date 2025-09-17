import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    mobile?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'https://localhost:5006/api/auth';
    private tokenKey = 'jwtToken';
    private userKey = 'currentUser';

    constructor(private http: HttpClient) { }

    setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    setUser(user: any) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    getUserQr(): Observable<{ qrImage: string }> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<{ qrImage: string }>('https://localhost:5006/api/users/qr', { headers });
    }


    getUser(): any {
        const user = localStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    getCurrentUserDetails(): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>('https://localhost:5006/api/users/me', { headers });
    }


    getUserFromToken(): any {
        const token = this.getToken();
        if (!token) return null;
        try {
            return jwtDecode(token);
        } catch {
            return null;
        }
    }

    unsubscribe(): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete(`${this.apiUrl}/unsubscribe`, { headers });
    }

    clearSession() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
    }

    register(data: RegisterRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    login(data: LoginRequest): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data);
    }

    forgotPassword(data: ForgotPasswordRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/forgot-password`, data);
    }
}