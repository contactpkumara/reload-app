import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ReloadAppService } from '../reload-app.service';
import { AppLoaderService } from 'src/app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-create-destributor',
  templateUrl: './create-destributor.component.html',
  styleUrls: ['./create-destributor.component.scss']
})
export class CreateDestributorComponent implements OnInit {

  public createDistributorForm: FormGroup;
  public userObj = JSON.parse(localStorage.getItem('userObj'));
  public cityList = [];
  public stateList = [];
  public destrictList = [];
  public localLocation: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private reloadService: ReloadAppService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.buildcreateDistributorForm();
    this.getStateList();
  }

  buildcreateDistributorForm() {
    this.createDistributorForm = this.fb.group({
      distributorName: ['', Validators.required],
      proprietorName: ['', Validators.required],
      proprietorMobile: ['', Validators.required],
      proprietorMail: ['', Validators.required],
      stateId: ['', Validators.required],
      districtId: [{value: '', disabled: true}, Validators.required],
      cityId: [{value: '', disabled: true}, Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      altitude: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      retFlag: ['', Validators.required],
      retMsg: ['', Validators.required]
    });
    this.getLocation();
  }

  getStateList() {
    this.reloadService.getStateList(this.userObj.loginEmployeeId)
      .subscribe(response => {
        this.stateList = response;
      },
      error => {
        console.log(error);
      });
  }

  getDistrictList(stateid) {
    this.loader.open();
    const destrictData = {
      stateId: stateid,
      userId: this.userObj.loginEmployeeId
    };
    this.reloadService.getDistrictLit(destrictData)
      .subscribe(response => {
        this.createDistributorForm.get('districtId').enable();
        this.destrictList = response;
        this.loader.close();
      },
      error => {
        this.loader.close();
        console.log(error);
      });
  }

  getCityList(desId) {
    this.loader.open();
    const cityData = {
      districtId: desId,
      userId: this.userObj.loginEmployeeId
    };
    this.reloadService.getCityList(cityData)
      .subscribe(response => {
        this.loader.close();
        this.createDistributorForm.get('cityId').enable();
        this.cityList = response;
      },
      error => {
        this.loader.close();
        console.log(error);
      });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.localLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude
        };
        this.setLocationValue(this.localLocation);
      });
    } else {
      console.log('No support for geolocation');
      this.localLocation = {
        latitude: 0.00,
        longitude: 0.00,
        altitude: 0.00
      };
      this.setLocationValue(this.localLocation);
    }
  }

  setLocationValue(locationObj) {
    console.log(locationObj);
    this.createDistributorForm.setValue({
      distributorName: '',
      proprietorName: '',
      proprietorMobile: '',
      proprietorMail: '',
      stateId: '',
      districtId: '',
      cityId: '',
      address: '',
      pincode: '',
      latitude: locationObj.latitude,
      longitude: locationObj.longitude,
      altitude: locationObj.altitude,
      userName: '',
      password: '',
      retFlag: '',
      retMsg: ''
    });
    this.createDistributorForm.get('latitude').disable();
    this.createDistributorForm.get('longitude').disable();
    this.createDistributorForm.get('altitude').disable();
  }

  createDestributor() {
    this.loader.open('Loading');
    const masterDistributorObj = this.createDistributorForm.value;
    masterDistributorObj.userId = this.userObj.loginEmployeeId;
    console.log(masterDistributorObj);
    this.reloadService.createDestributor(masterDistributorObj)
      .subscribe(response => {
        this.loader.close();
        console.log(response);
        this.snackBar.open(
          'New Distributer Created!',
          'close',
          { duration: 3000 }
        );
        this.createDistributorForm.reset();
        this.createDistributorForm.markAsUntouched();
        this.setLocationValue(this.localLocation);
      },
      error => {
        this.loader.close();
        console.log(error);
        this.snackBar.open(
          'Somthing went wrong, Please try again!',
          'close',
          { duration: 3000 }
        );
      });
  }

}
