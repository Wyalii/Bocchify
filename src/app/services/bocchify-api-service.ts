import { inject, Injectable } from '@angular/core';
import { RegistrationRequest } from '../interfaces/registration-request';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login-request';

@Injectable({
  providedIn: 'root',
})
export class BocchifyApiService {
  http: HttpClient = inject(HttpClient);
  registration(req: RegistrationRequest) {
    const url = 'http://localhost:5275/api/v1/Register';
    return this.http.post<Response>(url, req);
  }
  login(req: LoginRequest) {
    const url = '';
    return this.http.post<Response>(url, req);
  }
}
