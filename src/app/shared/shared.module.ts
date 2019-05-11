import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatDialogModule
} from '@angular/material';
import {
  CarouselModule,
  NavbarModule,
  IconsModule,
  DropdownModule,
  TooltipModule,
  ButtonsModule
} from 'angular-bootstrap-md';

// ALL TIME REQUIRED
import { AppLoaderComponent } from './services/app-loader/app-loader.component';
import { AppLoaderService } from './services/app-loader/app-loader.service';
import { RoutePartsService } from './services/route-parts.service';
import { ExcelService } from './services/excel.service';
import { LocationService } from './services/location.service';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatDialogModule,
    LayoutModule,
    CarouselModule,
    NavbarModule,
    IconsModule,
    DropdownModule,
    TooltipModule,
    ButtonsModule
  ],
  entryComponents: [
    AppLoaderComponent,
  ],
  providers: [
    AppLoaderService,
    RoutePartsService,
    ExcelService,
    LocationService
  ],
  declarations: [
      AppLoaderComponent
    ],
  exports: [
      AppLoaderComponent
    ]
})
export class SharedModule {}
