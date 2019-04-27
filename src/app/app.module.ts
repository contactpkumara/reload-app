import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';
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

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    NavbarModule,
    IconsModule,
    ButtonsModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    TooltipModule.forRoot(),
    DropdownModule.forRoot(),
    CarouselModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
