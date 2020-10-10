import { Component, OnInit  ,ViewContainerRef} from '@angular/core';
import { AuthenticationService } from '../../helper/services.api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  payload={
    email:''
  }
  errorMsgs:any;

  constructor(private router:Router,private vRef: ViewContainerRef,
    private authenticationService:AuthenticationService) {
      
     }

     submit(){
      this.errorMsgs=null;
      this.authenticationService.forgetPassword(this.payload.email).subscribe(
        res => {
        let data = res.json();
          // this.toastr.success("Email Sent Successfuly");
          this.router.navigate(['/login']);
      }, err => {
        // this.toastr.error("Error While Sending an Email...");
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
  email:string
}
