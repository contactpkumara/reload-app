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

  public dashboard = false;
  public mobile = false;
  public dth = false;

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sharedService: SharedService
    ) {}

  ngOnInit() {
    this.changeActiveClass();
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
