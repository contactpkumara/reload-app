import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../session.service';
import { MatSnackBar } from '@angular/material';
import { AppLoaderService } from 'src/app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signinForm: FormGroup;
  public successUrl = 'reload-app/mobile';
  public userName;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.userName = params['userName'];
    });
    this.buildSignifForm();
  }

  buildSignifForm() {
    this.signinForm = this.fb.group({
      username: [this.userName, Validators.required],
      password: ['', Validators.required]
    });
  }

  signin() {
    // console.log(this.signinForm.value);
    this.loader.open('Loading');
    this.sessionService.signin(this.signinForm.value)
      .subscribe(response => {
        // console.log(response.username);
        this.sessionService.getUserTaskList(response.loginEmployeeId)
        .subscribe(res => {
          // console.log('taskList');
          // console.log(res);
          localStorage.setItem('userObj', JSON.stringify(response));
          localStorage.setItem('taskList', JSON.stringify(res));
          this.loader.close();
          this.router.navigate([this.successUrl]);
        },
        err => {
          this.loader.close();
          if (err.status === 500) {
            this.snackBar.open(
              'Somthing went wrong. Please try again!',
              'close',
              { duration: 3000 }
            );
          }
        });
      },
      error => {
        this.loader.close();
        if (error.status === 500) {
          this.snackBar.open(
            'Somthing went wrong. Please try again!',
            'close',
            { duration: 3000 }
          );
        }
      });
  }

}
