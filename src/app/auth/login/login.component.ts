import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { AuthenticationService } from "../../helper/services.api";
import { GlobalEventsManager } from "./../../helper/global-events";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [GlobalEventsManager],
})
export class LoginComponent implements OnInit {
  loading = false;
  constructor(
    public toastr: ToastrManager,
    private vRef: ViewContainerRef,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    public router: Router,
    private globalEventsManager: GlobalEventsManager
  ) {}

  credentials = {
    email: "",
    client_number: "",
  };
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
    this.loading = true;
    this.authenticationService.login(this.credentials).subscribe(
      (data) => {
        let response = data;
        localStorage.setItem("drchefToken", data.data.token);
        localStorage.setItem('clientId',data.data.client_id);
        localStorage.setItem('package_remaining_days',data.data.package_remaining_days);
        localStorage.setItem('package_start_date',data.data.package_start_date);
        if(response.data.package_status === 'Expired'){
          this.router.navigate(['/signup'], { queryParams: { package: 'expired' } });
          return;
        }
        if(response.data.package_status === 'NotFound'){
          this.router.navigate(['/signup'], { queryParams: { package: 'NotFound' } });
          return;
        }
        this.loading = false;
        this.toastr.successToastr("Login successfully");
        if (this.returnUrl && this.returnUrl !== "/" && this.returnUrl !== "")
          this.router.navigateByUrl(this.returnUrl);
        else this.router.navigate(["/menus"]);
      },
      (err) => {
        this.loading = false;
        this.toastr.errorToastr("Wrong Credentials");
      }
    );
  }

  ngOnInit() {
    localStorage.setItem("drchefToken", "");
    // this.requiredMsg = false;
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.router.navigate([this.returnUrl]);
  }
}
