import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './helper/guard';
import { NotAuthGuard } from './helper/auth-guard';
import { AuthenticationService } from './helper/services.api';
import { UsersService } from './users/users.service'
import { GlobalEventsManager } from './helper/global-events';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { BaseModule } from './base/base.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './signup/signup.component';




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


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { PermissionsGuard } from './helper/permisssion-guard'

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
	ChangePasswordComponent,
  ResetPasswordComponent,
  ForgetPasswordComponent,
  SignupComponent,
  LoginComponent
  ],
  imports: [
	BrowserModule,
	BaseModule,
    FormsModule,
	MatButtonModule,
	DashboardModule,
	UserProfileModule,
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
RouterModule,
    AppRoutingModule,
	BrowserAnimationsModule,
	TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useFactory: createTranslateLoader,
			deps: [HttpClient]
		}
	})
  ],
  providers: [AuthGuard,NotAuthGuard,GlobalEventsManager, AuthenticationService,UsersService,PermissionsGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
