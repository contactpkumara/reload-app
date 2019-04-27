import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'session/check-username',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'session',
        loadChildren: './views/session/session.module#SessionModule',
        data: { title: 'Reload App | Session' }
      }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'reload-app',
        loadChildren: './views/reload-app/reload-app.module#ReloadAppModule',
        data: { title: 'Reload App | Dashboard' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
