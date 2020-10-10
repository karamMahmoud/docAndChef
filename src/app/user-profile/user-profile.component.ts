import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { AuthenticationService } from '../helper/services.api';
import { Router , ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  payload={
    name:'',
    email:''
  }
  errorMsgs=null;

  constructor(public router:Router,private authenticationService:AuthenticationService,private vRef: ViewContainerRef,private route:ActivatedRoute) {
     }
  submit(){
    this.errorMsgs =null;
    this.authenticationService.updateMe(this.payload).subscribe(data =>{
      let response = data;
      this.router.navigate(['/users']).then(() => {
        // this.toastr.success('Profile Updated', 'success!',{toastLife: 3000});   
        })   
    }, err => {
      // this.toastr.error("Error While Update your Profile...");
      if (err.json().errors) {
        this.errorMsgs = err.json().errors;
            return;
        }
    })
  }

  ngOnInit() {
    this.authenticationService.getUserData().subscribe(data =>{
	  let response = data;
      this.payload.email=response.data.email;
      this.payload.name=response.data.name;
    })
  }


}

interface payload{
  name:string,
  email:string
}