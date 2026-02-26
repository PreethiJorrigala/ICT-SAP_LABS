import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list';
import { EmployeeForm } from './employee-form/employee-form';
import { EmployeeViewComponent } from './employee-view/employee-view';

export const routes: Routes = [
    { path: '', component: EmployeeListComponent },
    { path: 'add', component: EmployeeForm },
    { path: 'edit/:id', component: EmployeeForm },
    { path: 'view/:id', component: EmployeeViewComponent }
];