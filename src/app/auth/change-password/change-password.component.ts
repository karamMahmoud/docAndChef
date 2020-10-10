  import { Component, OnInit ,ViewContainerRef} from '@angular/core';
  import { AuthenticationService } from '../../helper/services.api';
  import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  
  payload={
    new_password:'',
    old_password:'',
    new_password_confirmation:''
  }
  errorMsgs:any;

  constructor(private router:Router,private vRef: ViewContainerRef,
    private authenticationService:AuthenticationService) {
     }


  submit(){
    this.errorMsgs = null
    this.authenticationService.changepassword(this.payload).subscribe(
     res => {
      // this.toastr.success("Password Changed Successfully");
      let data = res.json();
	  this.payload.new_password = '';
	  this.payload.old_password = '';
	  this.payload.new_password_confirmation = '';
      }, err => {
        // this.toastr.error("Error While Changing your password...");
        if (err.json().errors) {
          this.errorMsgs = err.json().errors;
              return;
          }
      }
  )
  }

  ngOnInit() {
  }

}
interface payload{
  new_password:any,
  old_password:any,
  new_password_confirmation:any
}
