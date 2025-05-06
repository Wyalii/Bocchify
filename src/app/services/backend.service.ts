import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RegisterUserBodyInterface } from '../interfaces/register-user-body-interface';
import { RegisterResponseInterface } from '../interfaces/register-response-interface';
import { LoginUserInterface } from '../interfaces/login-user-interface';
import { LoginResponseInterface } from '../interfaces/login-response-interface';
import { FavouriteRequestInterface } from '../interfaces/favourite-request-interface';
import { FavouriteResponseInterface } from '../interfaces/favourite-response-interface';
import { UpdateProfileRequestInterface } from '../interfaces/update-profile-request-interface';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}
  private registerUrl: string = 'http://localhost:5227/api/Users/Register';
  private loginUrl: string = 'http://localhost:5227/api/Users/Login';
  private favouriteUrl: string = 'http://localhost:5227/api/Users/Favourite';
  private checkFavouriteUrl: string =
    'http://localhost:5227/api/Users/CheckFavourite';
  private updateUserProfileUrl: string =
    'http://localhost:5227/api/Users/UpdateProfile';

  register(registerRequestBody: RegisterUserBodyInterface) {
    const body = {
      username: registerRequestBody.username,
      email: registerRequestBody.email,
      password: registerRequestBody.password,
      profileImage: registerRequestBody.profileImage,
    };

    return this.http.post<RegisterResponseInterface>(this.registerUrl, body);
  }

  login(loginRequestBody: LoginUserInterface) {
    const body = {
      email: loginRequestBody.email,
      password: loginRequestBody.password,
    };

    return this.http.post<LoginResponseInterface>(this.loginUrl, body);
  }

  favouriteHandler(favouriteRequest: FavouriteRequestInterface) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${favouriteRequest.token}`,
    };
    const body = {
      MalId: favouriteRequest.mal_id,
    };
    console.log('log from backend handler:', body);

    return this.http.post<FavouriteResponseInterface>(this.favouriteUrl, body, {
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

  updateProfile(updateProfile: UpdateProfileRequestInterface) {
    const header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${updateProfile.token}`,
    };
    const body = {
      email: updateProfile.email,
      username: updateProfile.username,
      password: updateProfile.password,
      profilePicture: updateProfile.profilePicture,
    };
    console.log('log from backend service: ', body);
    return this.http.patch(this.updateUserProfileUrl, body, {
      headers: header,
    });
  }
}
