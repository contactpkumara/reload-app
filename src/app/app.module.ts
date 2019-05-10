import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatSidenavModule, MatListModule, MatTooltipModule, MatOptionModule, MatSelectModule, MatMenuModule, MatSnackBarModule, MatGridListModule, MatToolbarModule, MatButtonModule, MatRadioModule, MatCheckboxModule, MatProgressSpinnerModule, MatRippleModule, MatDialogModule } from '@angular/material';
import {
  CarouselModule,
  NavbarModule,
  IconsModule,
  DropdownModule,
  TooltipModule,
  ButtonsModule
} from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { SharedService } from './shared/shared.service';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';
import { MainNavComponent } from './shared/layouts/main-nav/main-nav.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent,
    MainNavComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
    ButtonsModule,
    TooltipModule.forRoot(),
    DropdownModule.forRoot(),
    CarouselModule.forRoot(),
    SharedModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
