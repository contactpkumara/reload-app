import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import * as XLSX from 'xlsx';
import { ExcelService } from '../../services/excel.service';
import { SessionService } from 'src/app/views/session/session.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  public balance = 0.0;
  public taskList = [];
  public adminMsg = 'Message From Admin';
  public dashboard = false;
  public mobile = false;
  public dth = false;
  public mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  public shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private excelService: ExcelService,
    private sharedService: SharedService
    ) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this.mobileQueryListener);
    }

  ngOnInit() {
    this.changeActiveClass();
    this.getBalance();
    this.setTaskList();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  changeActiveClass() {
    const currentUrl = this.router.url;
    if (currentUrl === '/reload-app/dashboard') {
      if (!this.dashboard) {
        this.dashboard = true;
        this.mobile = false;
        this.dth = false;
      }
    } else if (currentUrl === '/reload-app/mobile') {
      if (!this.mobile) {
        this.dashboard = false;
        this.mobile = true;
        this.dth = false;
      }
    } else if (currentUrl === '/reload-app/dth') {
      if (!this.dth) {
        this.dashboard = false;
        this.mobile = false;
        this.dth = true;
      }
    }
  }

  public signOut() {
    this.sharedService.signOut();
    this.router.navigate(['session/check-username']);
  }

  public getBalance() {
    const userObj = JSON.parse(localStorage.getItem('userObj'));
    this.sharedService.checkUserBalance(userObj.loginEmployeeId)
      .subscribe(response => {
        this.balance = response;
      },
      error => {
        console.log(error);
      });
  }

  public setTaskList() {
    const resTaskList = JSON.parse(localStorage.getItem('taskList'));
    resTaskList.forEach(element => {
      let jsonTask: jsonTaskList = {
        menuId: '',
        subMenuId: '',
        menuName: '',
        url: ''
      };
      jsonTask.menuId = element[0];
      jsonTask.subMenuId = element[1];
      jsonTask.menuName = element[2];
      if (element[2] === 'Mobile Recharge') {
        jsonTask.url = '/reload-app/mobile';
      } else if (element[2] === 'Bank Account Statement') {
        jsonTask.url = '/reload-app/bank-acc-stmnt';
      } else {
        jsonTask.url = '/session/404';
      }
      this.taskList.push(jsonTask);
    });
  }

}

export interface jsonTaskList {
  menuId: string;
  subMenuId: string;
  menuName: string;
  url: string;
}
