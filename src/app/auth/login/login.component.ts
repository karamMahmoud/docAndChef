import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../../helper/services.api';
import { GlobalEventsManager } from './../../helper/global-events';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [GlobalEventsManager]
})
export class LoginComponent implements OnInit {

  constructor(private vRef: ViewContainerRef,
    private authenticationService: AuthenticationService, private route: ActivatedRoute,
    public router: Router, private globalEventsManager: GlobalEventsManager) {
  }

  credentials = {
    email: '',
    password: ''
  }
  errorMsgs: any;
  errorData: any;
  requiredMsg: boolean;
  returnUrl: any;

  login({ value, valid }) {
    this.errorMsgs = null;
    this.errorData = null;
    this.requiredMsg = false;
    if (!valid) {
      this.requiredMsg = true;
      return;
    }
    this.authenticationService.login(this.credentials).subscribe(
      data => {
        let response = data;
        localStorage.setItem('etSparkToken', response.data.access_token);
        this.authenticationService.getPermissions().subscribe(
          res => {
            localStorage.setItem("permissions", JSON.stringify(res.data.data.permissionsResult));
          }
        )
        this.globalEventsManager.showNavBar(true);
        this.router.navigate([this.returnUrl]);
      }, (err) => {
        if (err.json().errors) {
          this.errorMsgs = err.json().errors;
          return;
        }
        else if (err.json().data) {
          this.errorData = err.json().data.message;
          return;
        }
      }
    );
  }

  ngOnInit() {
    this.requiredMsg = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([this.returnUrl]);
  }

}
