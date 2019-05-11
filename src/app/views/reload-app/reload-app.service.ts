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
      .post<any>(this.baseUrl + 'topup/dodthrecharge', reloadData)
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

  getUserList(userId, apiUrlKey) {
    let url = this.baseUrl;
    if (apiUrlKey === '2') {
      url += 'fundtransfer/getMasterDistributerList';
    } else if (apiUrlKey === '3') {
      url += 'fundtransfer/getDistributerList';
    } else if (apiUrlKey === '4') {
      url += 'fundtransfer/getRetailerList';
    } else {
      url += 'report/getUserList';
    }
    return this.http
      .post<any>(url, userId)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getStateList(userId) {
    return this.http
      .post<any>(this.baseUrl + 'commondetails/getstatelist', userId)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getDistrictLit(disData) {
    return this.http
      .post<any>(this.baseUrl + 'commondetails/getdistrictlist', disData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getCityList(cityData) {
    return this.http
      .post<any>(this.baseUrl + 'commondetails/getcitylist', cityData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  createRetailer(retailerData) {
    return this.http
      .post<any>(this.baseUrl + 'save/retailer', retailerData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  createDestributor(destributorData) {
    return this.http
      .post<any>(this.baseUrl + 'save/distributer', destributorData)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(this.handleError)
      );
  }

  createMasterDestributor(masterDestributorData) {
    return this.http
      .post<any>(this.baseUrl + 'save/masterdistributer', masterDestributorData)
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
