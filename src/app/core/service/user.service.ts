import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestApiRoutes } from '../config/rest-api-routes.config';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Users } from '../store/users/users.reducer';
import { UserDetail } from '../store/user-detail/user-detail.reducer';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(payload?: any): Observable<Users> {
    return this.http.get<Users>(
      environment.apiBaseUrl + RestApiRoutes.users, { params: payload }
    )
  }

  getUserByID(payload: any): Observable<UserDetail> {
    return this.http.get<UserDetail>(
      environment.apiBaseUrl + `${RestApiRoutes.users}/${payload.id}`
    )
  }

}
