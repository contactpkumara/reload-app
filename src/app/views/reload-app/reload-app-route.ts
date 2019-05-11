import { Routes } from '@angular/router';
import { MobileComponent } from './mobile/mobile.component';
import { DthReloadComponent } from './dth-reload/dth-reload.component';
import { BankAccStatementComponent } from './bank-acc-statement/bank-acc-statement.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { CreateRetailerComponent } from './create-retailer/create-retailer.component';
import { CreateDestributorComponent } from './create-destributor/create-destributor.component';
import { CreateMasterDestributorComponent } from './create-master-destributor/create-master-destributor.component';

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
            },
            {
                path: 'create-retailer',
                component: CreateRetailerComponent,
                data: { title: 'Fund Transfer' }
            },
            {
                path: 'create-distributor',
                component: CreateDestributorComponent,
                data: { title: 'Fund Transfer' }
            },
            {
                path: 'create-master-distributor',
                component: CreateMasterDestributorComponent,
                data: { title: 'Fund Transfer' }
            }
        ]
    }
];
