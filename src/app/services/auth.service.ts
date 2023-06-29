import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiKey = "08cc33bd5ae3a747598ce2ad84376e66"
  constructor(private http: HttpClient) {
    this.getToken().subscribe((token) => console.log(token))
   }

  getToken(): Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`)
  }
}
