import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { CheckUsernameComponent } from './check-username/check-username.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const SessionRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'signin',
                component: SigninComponent,
                data: { title: 'Reload App | Signin' }
            },
            {
                path: 'check-username',
                component: CheckUsernameComponent,
                data: { title: 'Reload App | Check UserName' }
            },
            // {
            //     path: 'signup',
            //     component: CheckUsernameComponent,
            //     data: { title: 'Reload App | Check UserName' }
            // }
            {
                path: '404',
                component: NotFoundComponent,
                data: { title: 'Reload App | Not Found' }
            }
        ]
    }
];
