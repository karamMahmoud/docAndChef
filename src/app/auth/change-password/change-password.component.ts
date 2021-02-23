import { Component, OnInit  ,ViewContainerRef} from '@angular/core';
import { AuthenticationService } from '../../helper/services.api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  loading = false
  confirmpassword='';
  token='';
  credentials={
    password:''
  }
  requiredMsg: boolean;
  errorMsgs:any;

  constructor(private router:Router,private vRef: ViewContainerRef,
    private route: ActivatedRoute,
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
      this.authenticationService.restore(this.credentials.password,this.token).subscribe(
        res => {
      this.loading = false;
      this.toastr.successToastr(res.messages);
          this.router.navigate(['/login']);
      }, err => {
      this.loading = false;
      this.toastr.errorToastr(err.error.messages);
      }
  )
    }

  ngOnInit() {
    this.route.queryParams.subscribe((res) => {
      if (res.token) {
       this.token = res.token;
      }
    });
  }

}
interface payload{
  email:string
}
