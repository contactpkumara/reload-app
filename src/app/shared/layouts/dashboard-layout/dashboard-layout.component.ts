import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import * as XLSX from 'xlsx';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  public balance = 10;
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
    private excelService: ExcelService
    ) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this.mobileQueryListener);
    }

  ngOnInit() {
    this.changeActiveClass();
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

}
