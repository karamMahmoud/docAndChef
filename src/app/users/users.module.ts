import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationService } from './../helper/services.api';
import { GlobalEventsManager } from './../helper/global-events';
import { ComponentsModule } from './../components/components.module';
import { AuthGuard } from 'app/helper/guard';
import { UsersService } from './users.service'
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddUserComponent } from './add-user/add-user.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { PermissionsGuard } from './../helper/permisssion-guard'

import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule
} from '@angular/material';
import { UsersComponent } from './users.component';
import { BaseModule } from './../base/base.module';
import { BaseComponent } from './../base/base.component';
import { from } from 'rxjs';

const routes: Routes = [
    {
        path: "",
        component: BaseComponent,
        children: [
            {
                path: "",
                component: UsersComponent,
                canActivate:[AuthGuard]
			},
			{
                path: "add-user",
                component: AddUserComponent,
                canActivate:[AuthGuard]
			},
			{
                path: "edit-user",
                component: AddUserComponent,
                canActivate:[AuthGuard]
            },
        ]
    },
];



@NgModule({
  declarations: [
	UsersComponent,
	AddUserComponent
  ],
  imports: [
    CommonModule,
	BaseModule,
	ModalModule.forRoot(),
    RouterModule.forChild(routes),
    FormsModule,
    MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		ReactiveFormsModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
	HttpClientModule,
	ToastrModule.forRoot(),
    ComponentsModule,
  ],
  providers: [GlobalEventsManager, AuthenticationService,UsersService,PermissionsGuard],
})
export class UsersModule { }
