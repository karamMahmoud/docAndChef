import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/helper/services.api';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  email;
  
  constructor(
    public toastr: ToastrManager,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  subscribeMail(){
    this.authenticationService
    .subscribeMail(this.email)
    .subscribe(
      (res) => {
        this.email = '';
        this.toastr.successToastr(res.messages);
      },
      (err) => {
        this.toastr.errorToastr(err.error.messages);
      }
    );
  }

}
