import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule
} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ReloadAppRoute } from './reload-app-route';
import { MobileComponent } from './mobile/mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReloadAppService } from './reload-app.service';

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
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    RouterModule.forChild(ReloadAppRoute)
  ],
  providers: [ReloadAppService, DatePipe]
})
export class ReloadAppModule { }
