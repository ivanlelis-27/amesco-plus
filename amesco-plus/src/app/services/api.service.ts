import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

export interface RegisterRequest {
    memberId: string;
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
export class ApiService {
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

    getAdBanners(): Observable<any[]> {
        return this.http.get<any[]>('https://localhost:5006/api/adbanners');
    }

    getUserTransactions(memberId: string): Observable<any[]> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(`https://localhost:5006/api/transactions`, { headers });
    }

    getBranches(): Observable<any[]> {
        return this.http.get<any[]>('https://localhost:5006/api/branches');
    }

    getNotifications(userId: string): Observable<any[]> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(`https://localhost:5006/api/notifications/list?userId=${userId}`);
    }

    likeNotification(notificationId: number, userId: string): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(
            `https://localhost:5006/api/notifications/like?notificationId=${notificationId}&userId=${userId}`,
            {}, // empty body
            { headers }
        );
    }

    unlikeNotification(notificationId: number, userId: string): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(
            `https://localhost:5006/api/notifications/unlike?notificationId=${notificationId}&userId=${userId}`,
            {}, // empty body
            { headers }
        );
    }

    createVoucher(voucherId: number, value: number): Observable<any> {
        const token = this.getToken();
        const user = this.getUserFromToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const body = {
            voucherId,
            UserId: user?.memberId,
            value
        };
        return this.http.post('https://localhost:5006/api/vouchers/create', body, { headers });
    }

    deleteVoucher(voucherCode: string): Observable<any> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete<any>(
            `https://localhost:5006/api/vouchers/delete?voucherCode=${encodeURIComponent(voucherCode)}`,
            { headers }
        );
    }

    getUserVouchers(memberId: string): Observable<any[]> {
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(`https://localhost:5006/api/users/user/${memberId}`, { headers });
    }

    uploadProfileImage(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('image', file);
        const token = this.getToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post('https://localhost:5006/api/users/upload-image', formData, { headers });
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

    getExistingMemberById(memberId: string): Observable<any> {
        return this.http.get<any>(`https://localhost:5006/api/existingmembers/by-memberid?memberId=${encodeURIComponent(memberId)}`);
    }

    register(data: RegisterRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    getGeneratedMemberId(): Observable<{ memberId: string }> {
        return this.http.get<{ memberId: string }>('https://localhost:5006/api/auth/generate-memberid');
    }

    login(data: LoginRequest): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data);
    }

    forgotPassword(data: ForgotPasswordRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/forgot-password`, data);
    }
}