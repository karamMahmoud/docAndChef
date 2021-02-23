import { Component, OnInit  ,ViewContainerRef} from '@angular/core';
import { AuthenticationService } from '../../helper/services.api';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-reset-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  loading = false
  credentials={
    email:''
  }
  requiredMsg: boolean;
  errorMsgs:any;

  constructor(private router:Router,private vRef: ViewContainerRef,
    public toastr: ToastrManager,
    private authenticationService:AuthenticationService) {
      
     }

     submit({ value, valid }){
      this.requiredMsg = false;
      if (!valid) {
        this.requiredMsg = true;
        return;
      }
      this.loading = true;
      this.authenticationService.forgetPassword(this.credentials.email).subscribe(
        res => {
      this.loading = false;
      this.toastr.successToastr(res.messages);
          this.router.navigate(['/login']);
      }, err => {
      this.loading = false;
      this.toastr.errorToastr("Some thing wrong");
      }
  )
    }

  ngOnInit() {
  }

}
interface payload{
  email:string
}
