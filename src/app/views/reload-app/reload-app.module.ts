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
  MatRadioModule,
  MatAutocompleteModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReloadAppRoute } from './reload-app-route';
import { MobileComponent } from './mobile/mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReloadAppService } from './reload-app.service';
import { DthReloadComponent } from './dth-reload/dth-reload.component';
import { BankAccStatementComponent } from './bank-acc-statement/bank-acc-statement.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';

@NgModule({
  declarations: [MobileComponent, DthReloadComponent, BankAccStatementComponent, FundTransferComponent],
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
    MatAutocompleteModule,
    RouterModule.forChild(ReloadAppRoute)
  ],
  providers: [ReloadAppService, DatePipe]
})
export class ReloadAppModule { }
