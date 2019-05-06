import { Routes } from '@angular/router';
import { MobileComponent } from './mobile/mobile.component';
import { DthReloadComponent } from './dth-reload/dth-reload.component';
import { BankAccStatementComponent } from './bank-acc-statement/bank-acc-statement.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';

export const ReloadAppRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'bank-acc-stmnt',
                component: BankAccStatementComponent,
                data: { title: 'Bank Account Statement' }
            },
            {
                path: 'mobile',
                component: MobileComponent,
                data: { title: 'Mobile Recharge' }
            },
            {
                path: 'dth-reload',
                component: DthReloadComponent,
                data: { title: 'DTH Recharge' }
            },
            {
                path: 'fund-transfer',
                component: FundTransferComponent,
                data: { title: 'Fund Transfer' }
            }
        ]
    }
];
