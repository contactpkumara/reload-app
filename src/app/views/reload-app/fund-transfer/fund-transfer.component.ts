import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ReloadAppService } from '../reload-app.service';
import { AppLoaderService } from './../../../shared/services/app-loader/app-loader.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss']
})
export class FundTransferComponent implements OnInit {

  public fundTransferForm: FormGroup;
  public userObj = JSON.parse(localStorage.getItem('userObj'));
  public userList: User[] = [];
  public filteredOptions: Observable<User[]>;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private reloadService: ReloadAppService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.buildfundTransferForm();
    this.getUserList();
  }

  buildfundTransferForm() {
    this.fundTransferForm = this.fb.group({
      benificiaryId: ['', Validators.required],
      amount: ['', Validators.required],
      remarks: ['', Validators.required]
    });
  }

  fundTransfer() {
    this.loader.open('Loading');
    const transferData = this.fundTransferForm.value;
    const filterValue = this._filter(transferData.benificiaryId);
    transferData.benificiaryId = filterValue[0].userId;
    console.log(this.fundTransferForm.value);
    transferData.userid = this.userObj.loginEmployeeId;
    this.reloadService.fundTransfer(transferData)
      .subscribe(response => {
        this.loader.close();
        this.fundTransferForm.reset();
        this.fundTransferForm.markAsUntouched();
        this.snackBar.open(
          response.retMsg,
          'close',
          { duration: 3000 }
        );
      },
      error => {
        this.loader.close();
        this.fundTransferForm.reset();
        this.fundTransferForm.markAsUntouched();
        this.snackBar.open(
          'Somthing went wrong, Please try again!',
          'close',
          { duration: 3000 }
        );
        console.log(error);
      });
  }

  getUserList() {
    const userid = this.userObj.loginEmployeeId;
    this.reloadService.getUserList(userid)
      .subscribe(response => {
        console.log(response);
        this.userList = response;
        this.filterOnInit();
      },
      error => {
        console.log(error);
      });
  }

  filterOnInit() {
    this.filteredOptions = this.fundTransferForm.controls.benificiaryId.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value),
        map(name => name ? this._filter(name) : this.userList.slice())
      );
  }

  displayFn(user?: User): string | undefined {
    return user ? user.userName : undefined;
  }

  private _filter(name: any): User[] {
    const filterValue = name.toLowerCase();

    return this.userList.filter(user => user.userName.toLowerCase().indexOf(filterValue) === 0);
  }

}

export interface User {
  userId: string;
  userName: string;
}
