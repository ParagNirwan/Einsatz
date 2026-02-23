import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

interface RegisterRequest{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface AuthResponse{
    token: string;
}

interface loginRequest{
    email:string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private apiUrl = 'http://localhost:8080/api/auth';
    
    constructor(private http: HttpClient){}

    register(data: RegisterRequest): Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
    }

    login(data:loginRequest):Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`,data);
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

}