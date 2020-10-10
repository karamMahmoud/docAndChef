import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { AuthenticationService } from '../../helper/services.api';
import { Router , ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  payload:payload={
    token:'',
    email:'',
    password:'',
    password_confirmation:''
  }
  errorMsgs=null;


  constructor(public router:Router,private authenticationService:AuthenticationService
    ,private vRef: ViewContainerRef,private route:ActivatedRoute) {
     }

  submit(){
    this.errorMsgs =null;
    this.authenticationService.resetPassword(this.payload).subscribe(data =>{
      let response = data.json();
      this.router.navigate(['/login']).then(() => {
        // this.toastr.success('Password Changed Successfully', 'Success!',{toastLife: 3000});   
        })   
    }, err => {
      // this.toastr.error("Error While Reset your password...");
      if (err.json().errors) {
        this.errorMsgs = err.json().errors;
            return;
        }
    })
  }

  ngOnInit() {
    this.payload.token = this.route.snapshot.queryParams['token'];
  }

}

interface payload {
  token:string,
  email:string,
  password:any,
  password_confirmation:any
}
