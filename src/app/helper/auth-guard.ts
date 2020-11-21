import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, CanActivate} from '@angular/router';
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
export class NotAuthGuard implements CanActivate {

    constructor(private router: Router) { }
    token=localStorage.getItem("drchefToken");    

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.token) {
            this.router.navigate(['./dashboard'])
            return false;
        }
        else {
            return true;            
        }
    }

}
