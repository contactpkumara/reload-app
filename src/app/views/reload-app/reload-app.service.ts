import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ReloadAppService {

  public userApi: string = environment.userApi;
  public topUpApi: string = environment.topUpApi;
  public baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getSpList(splData: spListData) {
    return this.http
      .post<any>(this.topUpApi + 'getsplist', splData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getAccountStatement(searchData: accStData) {
    return this.http
      .post<any>(this.baseUrl + 'report/getAccountStatement', searchData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  mobileReload(reloadData: relData) {
    return this.http
      .post<any>(this.baseUrl + 'topup', reloadData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  dthReload(reloadData: relData) {
    return this.http
      .post<any>(this.baseUrl + 'topup/dodthrechargepup', reloadData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  fundTransfer(fundTransData: ftData) {
    return this.http
      .post<any>(this.baseUrl + 'fundtransfer', fundTransData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getUserList(userId) {
    return this.http
      .post<any>(this.baseUrl + 'report/getUserList', userId)
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

export interface spListData {
  serviceid: string;
  subserviceid: string;
  userid: string;
}

export interface accStData {
  userId: string;
  transType: string;
  fromDate: string;
  toDate: string;
}

export interface relData {
  customermobno: string;
  serviceoperatorid: string;
  amount: string;
  stvtype: string;
  userid: string;
}

export interface ftData {
  benificiaryId: string;
  amount: string;
  remarks: string;
  userid: string;
}
