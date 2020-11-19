import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./helper/guard";
import { NotAuthGuard } from "./helper/auth-guard";
import { AuthenticationService } from "./helper/services.api";
import { UsersService } from "./users/users.service";
import { GlobalEventsManager } from "./helper/global-events";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { BaseModule } from "./base/base.module";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { HealthyComponent } from "./healthy/healthy.component";
import { MenusComponent } from "./menus/menus.component";
import { numberToWord } from "./signup/numbetToDigit.pipe";
import { ToastrModule } from 'ng6-toastr-notifications';
import { SwiperModule } from "ngx-swiper-wrapper";
import { SWIPER_CONFIG } from "ngx-swiper-wrapper";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";

import { ChangePasswordComponent } from "./auth/change-password/change-password.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { ForgetPasswordComponent } from "./auth/forget-password/forget-password.component";
import { PermissionsGuard } from "./helper/permisssion-guard";

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: "horizontal",
  slidesPerView: "auto",
};
@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    MenusComponent,
    HealthyComponent,
    ForgetPasswordComponent,
    SignupComponent,
    numberToWord,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BaseModule,
    ToastrModule.forRoot(),
    FormsModule,
    UserProfileModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    AuthGuard,
    NotAuthGuard,
    GlobalEventsManager,
    AuthenticationService,
    UsersService,
    PermissionsGuard,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
