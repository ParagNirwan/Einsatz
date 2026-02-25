import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

interface createOrgRequest {
    name: string;
    domain:string;
}

interface AuthResponse{
    token: string;
}


@Injectable({
    providedIn: 'root'
})
export class OrganizationService{
    private apiUrl = 'http://localhost:8080/organization';

    constructor(private http:HttpClient){}

    create(data:createOrgRequest):Observable<AuthResponse>{
        return this.http.post<AuthResponse>(`${this.apiUrl}/create`,data);
    }

}