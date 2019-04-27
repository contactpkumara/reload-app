import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MobileComponent } from './mobile/mobile.component';

export const ReloadAppRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { title: 'Reload App | Dashboard' }
            },
            {
                path: 'mobile',
                component: MobileComponent,
                data: { title: 'Reload App | Mobile' }
            }
        ]
    }
];
