import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

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
