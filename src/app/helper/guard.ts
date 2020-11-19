import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import {
  ActivatedRouteSnapshot,
  Router,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthenticationService } from "../helper/services.api";
import { map, catchError, takeWhile } from "rxjs/operators";

/**
 * @class AuthGuard
 * @classdesc
 *AuthGuard class checks for the session token, userid and csrf token,which in turn
  shows user is logged in and return true or else false.
  Which further used to redirect through navigate to other route
 * @var authguard is a variable which return boolean value to specify user login interaction
 * @return Flag with boolean value will be returned. True: If User is Authorized else False
 **/

@Injectable()
export class AuthGuard implements CanActivate {
  activated = true;
  constructor(public api: AuthenticationService, private router: Router) {}
  token = localStorage.getItem("drchefToken");
  /* Function to check whether user is logged in or not*/
  returnedValue: boolean;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      // if(!this.token) {
      //   localStorage.removeItem("otoToken");
      //   this.router.navigate(["/login"], {
      //     queryParams: { returnUrl: state.url },
      //   });
      //   resolve(false);
      //   return;
      // }
      if(localStorage.getItem('drchefToken'))
          resolve(true);
          else{
          localStorage.removeItem("drchefToken");
          this.router.navigate(["/login"], {
            queryParams: { returnUrl: state.url },
          });
          resolve(false);
        }
    });
  }
}
