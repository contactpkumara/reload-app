import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    public taskList = [];
    public balance = 0.0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
    private router: Router
    ) {
    this.setTaskList();
    this.getBalance();
  }

  public setTaskList() {
    this.taskList = JSON.parse(localStorage.getItem('taskList'));
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
        // console.log(error);
      });
  }

}
