import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from './../../../environments/environment.prod';

@Injectable()
export class SessionService {

  public sessionUrl: string = environment.sessionUrl;

  constructor(private http: HttpClient) { }

  public checkUserName(checkUserNameData: checkUserNameData) {
    return this.http
      .post<any>(this.sessionUrl + 'chkusername' , checkUserNameData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  public signin(signinData: signinData) {
    return this.http
      .post<any>(this.sessionUrl, signinData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse | any) {
    return throwError(error);
  }

}

export interface checkUserNameData {
  userName: string;
}

export interface signinData {
  username: any;
  password: any;
}
