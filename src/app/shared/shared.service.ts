import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from './../../environments/environment.prod';

@Injectable()
export class SharedService {

  public sessionUrl: string = environment.sessionUrl;
  public userApi: string = environment.userApi;

  constructor(private http: HttpClient) { }

  checkUserBalance(userId) {
    return this.http
      .post<any>(this.userApi + 'chkuserbalance', userId)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  public signOut() {
    localStorage.removeItem('userObj');
    localStorage.removeItem('taskList');
  }

  private handleError(error: HttpErrorResponse | any) {
    return throwError(error);
  }

}
