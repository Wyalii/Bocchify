import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface RegisterUserBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserBody {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}
  private registerUrl: string = 'http://localhost:5227/api/Users/Register';
  private loginUrl: string = 'http://localhost:5227/api/Users/Login';

  register(registerRequestBody: RegisterUserBody) {
    const body = {
      username: registerRequestBody.username,
      email: registerRequestBody.email,
      password: registerRequestBody.password,
    };

    return this.http.post(this.registerUrl, body);
  }

  login(loginRequestBody: LoginUserBody) {
    const body = {
      email: loginRequestBody.email,
      password: loginRequestBody.password,
    };

    return this.http.post(this.loginUrl, body);
  }
}
