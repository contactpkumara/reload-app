import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CarouselModule,
  NavbarModule,
  IconsModule,
  DropdownModule,
  TableModule
} from 'angular-bootstrap-md';
import {
  MatProgressBarModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ReloadAppRoute } from './reload-app-route';
import { MobileComponent } from './mobile/mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DashboardComponent, MobileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSnackBarModule,
    CarouselModule,
    NavbarModule,
    IconsModule,
    DropdownModule,
    TableModule,
    RouterModule.forChild(ReloadAppRoute)
  ]
})
export class ReloadAppModule { }
