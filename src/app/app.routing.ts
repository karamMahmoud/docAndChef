import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { AuthGuard } from 'app/helper/guard';
import { NotAuthGuard } from 'app/helper/auth-guard';
import { PermissionsGuard } from './helper/permisssion-guard'
import { MenusComponent } from "./menus/menus.component";
import { SignupComponent } from './signup/signup.component';
// import { CategoryComponent } from './category/category.component';
import { HealthyComponent } from './healthy/healthy.component';

const routes: Routes =[
    { path: '',redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard', 
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    { path: 'signup',  component: SignupComponent},
    // { path: 'category',  component: CategoryComponent},
    { path: 'healthyfood',  component: HealthyComponent},
    { path: 'menus',  component: MenusComponent},

    {
      path: 'user-profile', 
      loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule),
    },
    {
      path: 'users', 
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    },
  { path: 'login',  component: LoginComponent , canActivate:[NotAuthGuard]},
	{ path: 'change-password',  component: ChangePasswordComponent ,canActivate:[AuthGuard]},
    { path: 'auth/reset-password',  component: ResetPasswordComponent ,canActivate:[NotAuthGuard]},
    { path: 'forget-password',  component: ForgetPasswordComponent ,canActivate:[NotAuthGuard]},
    { path: '**',               redirectTo: 'dashboard', pathMatch: 'full' }
];

//returnurl
//token test by api
//queryparams

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
