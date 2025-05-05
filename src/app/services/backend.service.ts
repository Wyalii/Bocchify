import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieServiceService } from './cookie-service.service';
import { firstValueFrom } from 'rxjs';
export interface RegisterUserBody {
  username: string;
  email: string;
  password: string;
  profileImage: string | null;
}

export interface LoginUserBody {
  email: string;
  password: string;
}
interface LoginResponse {
  name: string;
  message: string;
  newToken: string;
  profileImage: string;
}
interface RegisterResponse {
  message: string;
}
export interface FavourteRequest {
  token: string;
  mal_id: number;
}
interface FavourteResponse {
  favourited: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieServiceService
  ) {}
  private registerUrl: string = 'http://localhost:5227/api/Users/Register';
  private loginUrl: string = 'http://localhost:5227/api/Users/Login';
  private favouriteUrl: string = 'http://localhost:5227/api/Users/Favourite';
  private checkFavouriteUrl: string =
    'http://localhost:5227/api/Users/CheckFavourite';
  private validateTokenUrl: string =
    'http://localhost:5227/api/Users/ValidateToken';

  register(registerRequestBody: RegisterUserBody) {
    const body = {
      username: registerRequestBody.username,
      email: registerRequestBody.email,
      password: registerRequestBody.password,
      profileImage: registerRequestBody.profileImage,
    };

    return this.http.post<RegisterResponse>(this.registerUrl, body);
  }

  login(loginRequestBody: LoginUserBody) {
    const body = {
      email: loginRequestBody.email,
      password: loginRequestBody.password,
    };

    return this.http.post<LoginResponse>(this.loginUrl, body);
  }

  favouriteHandler(favouriteRequest: FavourteRequest) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${favouriteRequest.token}`,
    };
    const body = {
      MalId: favouriteRequest.mal_id,
    };
    console.log('log from backend handler:', body);

    return this.http.post<FavourteResponse>(this.favouriteUrl, body, {
      headers: header,
    });
  }
  async checkFavourite(mal_id: string, token: string): Promise<any> {
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const body = {
      MalId: parseInt(mal_id),
    };

    return await firstValueFrom(
      this.http.post(this.checkFavouriteUrl, body, { headers: header })
    );
  }
}
