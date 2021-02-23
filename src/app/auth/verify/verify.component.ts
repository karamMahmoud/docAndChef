import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { AuthenticationService } from "../../helper/services.api";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
})
export class VerifyComponent implements OnInit {
  verified = false;
  token = "";
  constructor(
    private router: Router,
    private vRef: ViewContainerRef,
    private route: ActivatedRoute,
    public toastr: ToastrManager,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((res) => {
      if (res.token) {
        this.token = res.token;
        this.authenticationService
          .verify(this.token)
          .subscribe(
            (res) => {
              this.verified = true;
              this.toastr.successToastr(res.messages);
            },
            (err) => {
              this.verified = false;
              this.toastr.errorToastr(err.error.messages);
            }
          );
      }
    });
  }
}
