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
interface Organization {
  id: string;
  name: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  organization?: Organization | null;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private userApiUrl = 'http://localhost:8080/users';

  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  login(data: loginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  //  NEW — Load user from /me
  loadUser(): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/me`);
  }

  setUser(user: User) {
    this.currentUser = user;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  getOrganization() {
    return this.currentUser?.organization ?? null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}