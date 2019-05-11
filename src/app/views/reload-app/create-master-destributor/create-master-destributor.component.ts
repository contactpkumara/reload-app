import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ReloadAppService } from '../reload-app.service';
import { AppLoaderService } from 'src/app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-create-master-destributor',
  templateUrl: './create-master-destributor.component.html',
  styleUrls: ['./create-master-destributor.component.scss']
})
export class CreateMasterDestributorComponent implements OnInit {

  public createMasterDistributor: FormGroup;
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
    this.buildCreateMasterDistributor();
    this.getStateList();
  }

  buildCreateMasterDistributor() {
    this.createMasterDistributor = this.fb.group({
      masterDistName: ['', Validators.required],
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
        this.createMasterDistributor.get('districtId').enable();
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
        this.createMasterDistributor.get('cityId').enable();
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
    this.createMasterDistributor.setValue({
      masterDistName: '',
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
    this.createMasterDistributor.get('latitude').disable();
    this.createMasterDistributor.get('longitude').disable();
    this.createMasterDistributor.get('altitude').disable();
  }

  createMasterDistributer() {
    this.loader.open('Loading');
    const masterDistributorObj = this.createMasterDistributor.value;
    masterDistributorObj.userId = this.userObj.loginEmployeeId;
    console.log(masterDistributorObj);
    this.reloadService.createMasterDestributor(masterDistributorObj)
      .subscribe(response => {
        this.loader.close();
        console.log(response);
        this.snackBar.open(
          'New Master Distributer Created!',
          'close',
          { duration: 3000 }
        );
        this.createMasterDistributor.reset();
        this.createMasterDistributor.markAsUntouched();
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
