import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationService } from './../helper/services.api';
import { GlobalEventsManager } from './../helper/global-events';
import { ComponentsModule } from './../components/components.module';
import { AuthGuard } from 'app/helper/guard';

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
import { DashboardComponent } from './dashboard.component';
import { BaseModule } from './../base/base.module';
import { BaseComponent } from '../base/base.component';


const routes: Routes = [
    {
        path: "",
        component: BaseComponent,
        children: [
            {
                path: "",
                component: DashboardComponent,
                // canActivate:[AuthGuard]
            },
        ]
    },
];



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
	BaseModule,
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
    ComponentsModule,
  ],
  providers: [GlobalEventsManager, AuthenticationService],
})
export class DashboardModule { }
