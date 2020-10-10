import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

@Injectable()
export class PermissionsGuard implements CanActivate {
    permissions: any = JSON.parse(localStorage.getItem("permissions"));

    constructor(private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let url = state['_root'].value._urlSegment.children.primary.segments[state['_root'].value._urlSegment.children.primary.segments.length - 1].path;
        if (url == 'add-user') {
            return this.permissions.users['create-user'];
        }
        else if (url == 'edit-user') {
            return this.permissions.users['update-user'];
        }
        else if (url == 'users') {
            return this.permissions.users['list-users'];
        }
        else if (url == 'change-password') {
            return this.permissions.users['change-password'];

        }
        else if (url == 'user-profile') {
            return this.permissions.users['update-my-profile'];
        }
        else{
        this._router.navigate(['/dashboard']);
        }
    }

}