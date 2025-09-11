import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    mobile?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'https://localhost:5006/api/auth';

    constructor(private http: HttpClient) { }

    register(data: RegisterRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, data);
    }
}