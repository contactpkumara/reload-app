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
  public tansferCatForm: FormGroup;
  public userObj = JSON.parse(localStorage.getItem('userObj'));
  public userList: User[] = [];
  public filteredOptions: Observable<User[]>;
  public disableFormField = true;
  public selfTr = false;
  public mDTr = false;
  public dTr = false;
  public rTr = false;
  public selectType = '0';
  public formFieldName = '';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private reloadService: ReloadAppService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.buildfundTransferForm();
    this.setUserAuthorities();
  }

  buildfundTransferForm() {
    this.fundTransferForm = this.fb.group({
      benificiaryId: [{value: '', disabled: true}, Validators.required],
      amount: ['', Validators.required],
      remarks: ['', Validators.required]
    });
    this.tansferCatForm = this.fb.group({
      transferCategory: ['', Validators.required]
    });
  }

  fundTransfer() {
    this.loader.open('Loading');
    const transferData = this.fundTransferForm.value;
    if (this.selectType === '1') {
      transferData.benificiaryId = this.userObj.loginEmployeeId;
    } else {
      const filterValue = this._filter(transferData.benificiaryId);
      transferData.benificiaryId = filterValue[0].id;
    }
    transferData.userid = this.userObj.loginEmployeeId;
    // console.log(transferData);
    this.reloadService.fundTransfer(transferData)
      .subscribe(response => {
        this.loader.close();
        this.fundTransferForm.reset();
        this.fundTransferForm.markAsUntouched();
        if (this.selectType === '1') {
          this.fundTransferForm.setValue({
            benificiaryId: this.userObj.loginEmployeeName,
            amount: '',
            remarks: ''
          });
        }
        this.snackBar.open(
          response.retMsg,
          'close',
          { duration: 3000 }
        );
      },
      error => {
        this.loader.close();
        this.fundTransferForm.reset();
        this.tansferCatForm.reset();
        this.fundTransferForm.markAsUntouched();
        this.tansferCatForm.markAsUntouched();
        this.snackBar.open(
          'Somthing went wrong, Please try again!',
          'close',
          { duration: 3000 }
        );
        // console.log(error);
      });
  }

  getUserList(apiUrlKey: number) {
    const userid = this.userObj.loginEmployeeId;
    this.reloadService.getUserList(userid, apiUrlKey)
      .subscribe(response => {
        this.userList = response;
        this.filterOnInit();
        this.fundTransferForm.get('benificiaryId').enable();
      },
      error => {
        // console.log(error);
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
    return user ? user.name : undefined;
  }

  private _filter(name: any): User[] {
    const filterValue = name.toLowerCase();

    return this.userList.filter(user => user.name.toLowerCase().indexOf(filterValue) === 0);
  }

  loadUserList(event) {
    this.selectType = event.value;
    this.fundTransferForm.reset();
    this.fundTransferForm.markAsUntouched();
    if (this.selectType === '1') {
      this.fundTransferForm.get('benificiaryId').disable();
      this.fundTransferForm.setValue({
        benificiaryId: this.userObj.loginEmployeeName,
        amount: '',
        remarks: ''
      });
    } else {
      if (this.selectType === '2') {
        this.formFieldName = 'Master Distributor User';
      } else if (this.selectType === '3') {
        this.formFieldName = 'Distributor User';
      } else {
        this.formFieldName = 'Retailer User';
      }
      this.getUserList(event.value);
    }
  }

  setUserAuthorities() {
    const userRole = this.userObj.loginUserTypeId;
    // console.log('userRole - ', userRole);
    if (userRole === 0) {
      this.selfTr = true;
      this.mDTr = true;
      this.dTr = true;
      this.rTr = false;
    } else if (userRole === 1) {
      this.selfTr = false;
      this.mDTr = false;
      this.dTr = true;
      this.rTr = true;
    } else {
      this.selfTr = false;
      this.mDTr = false;
      this.dTr = false;
      this.rTr = true;
    }
  }

}

export interface User {
  id: string;
  name: string;
}
