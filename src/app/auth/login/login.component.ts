import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../../helper/services.api';
import { GlobalEventsManager } from './../../helper/global-events';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [GlobalEventsManager]
})
export class LoginComponent implements OnInit {

  constructor(public toastr: ToastrManager,private vRef: ViewContainerRef,
    private authenticationService: AuthenticationService, private route: ActivatedRoute,
    public router: Router, private globalEventsManager: GlobalEventsManager) {
  }

  credentials = {
    email: '',
    client_number: ''
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
      this.toastr.successToastr("Login successfully");
        let response = data;
        localStorage.setItem('drchefToken', response.data.token);
        if (this.returnUrl && this.returnUrl !== "/" && this.returnUrl !== "")
              this.router.navigateByUrl(this.returnUrl);
            else this.router.navigate(["/menus"]);
      }, (err) => {
        this.toastr.errorToastr("Wrong Credentials");
      }
    );
  }

  ngOnInit() {
    // this.requiredMsg = false;
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.router.navigate([this.returnUrl]);
  }

}
