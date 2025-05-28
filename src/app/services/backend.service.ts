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
import { DecodeTokenResponse } from '../interfaces/decodeToken-response-interface';
import { UpdateProfileResponeInterface } from '../interfaces/update-profile-response-interface';
import { forgotPasswordResponseInterface } from '../interfaces/forgotPassword-response-interface';
import { resetPasswordInterface } from '../interfaces/resetPassword-response-interface';
import { fetchUserFavouritesInterface } from '../interfaces/fetchUserFavourites-interface';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}
  private baseUrl:string = environment.baseUrl;
  private registerUrl: string = `${this.baseUrl}/api/Auth/Register`;
  private loginUrl: string = `${this.baseUrl}/api/Auth/Login`;
  private favouriteUrl: string =
    `${this.baseUrl}/api/Favourite/Favourite`;
  private checkFavouriteUrl: string =
    `${this.baseUrl}/api/Favourite/CheckFavourite`;
  private updateUserProfileUrl: string =
    `${this.baseUrl}/api/Users/UpdateProfile`;
  private decodeTokenUrl: string =
    `${this.baseUrl}/api/Users/DecodeToken`;
  private forgotPasswordUrl: string =
    `${this.baseUrl}/api/Password/ForgotPassword`;
  private resetPasswordUrl: string =
    `${this.baseUrl}/api/Password/ResetPassword`;
  private getFavouritesUrl: string =
    `${this.baseUrl}/api/Favourite/GetFavourites`;

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
      Type: favouriteRequest.type,
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
    return this.http.patch<UpdateProfileResponeInterface>(
      this.updateUserProfileUrl,
      body,
      {
        headers: header,
      }
    );
  }

  decodeToken(token: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<DecodeTokenResponse>(
      this.decodeTokenUrl,
      {},
      { headers }
    );
  }

  forgotPassword(email: string) {
    const body = {
      Email: email,
    };
    return this.http.post<forgotPasswordResponseInterface>(
      this.forgotPasswordUrl,
      body
    );
  }
  resetPassword(email: string, token: string, newPassword: string) {
    const body = {
      email: email,
      token: token,
      newPassword: newPassword,
    };
    return this.http.post<resetPasswordInterface>(this.resetPasswordUrl, body);
  }

  getFavourites(token: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return this.http.get<fetchUserFavouritesInterface[]>(
      this.getFavouritesUrl,
      {
        headers,
      }
    );
  }
}
