import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRouteSnapshot,Router, CanActivate,RouterStateSnapshot} from '@angular/router';
import { AuthenticationService } from '../helper/services.api';
import { map, catchError } from 'rxjs/operators';

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

    constructor(private router: Router,private authenticationService:AuthenticationService) { }
    /* Function to check whether user is logged in or not*/
    returnedValue:boolean;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let token=localStorage.getItem("etSparkToken");
        if (token) {
            return this.authenticationService.getUserDataAuth().pipe(map(data =>{
                return true;
            }, (err) => {
                localStorage.removeItem("etSparkToken");
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
                }
                ),catchError(() => {
                    localStorage.removeItem("etSparkToken");
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return Observable.apply(false);
                })
            )
        }
        else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;            
        }
    }

}
