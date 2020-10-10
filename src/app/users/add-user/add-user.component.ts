import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from './../../helper/services.api';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UsersService } from './../users.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  token = localStorage.getItem('etSparkToken');
  user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    id: null,
  };
  roles: any;
  userRoles: any = [];

  edit = false;
  errorMsgs: any;
  requiredMsg: boolean;


  constructor(public _UsersService: UsersService, public toastr: ToastrManager, private activatedRoute: ActivatedRoute, private router: Router, private vRef: ViewContainerRef,
    private authenticationService: AuthenticationService) {

  }


  adduser({ value, valid }) {
    this.errorMsgs = null;
    if (!valid) {
      this.requiredMsg = true;
      return;
    }
    for (let i = 0; i < this.userRoles.length; i++) {
      this.user[`roles[${i}]`] = this.userRoles[i];
    }
    this._UsersService.addUser(this.user).subscribe(data => {
      let response = data;
      this.router.navigate(['/users']).then(() => {
        this.toastr.successToastr(data['data']['message'], 'Success!');
      })
    }, (err) => {
      // this.toastr.error("Error While adding new user...");
      if (err.json().errors) {
        this.errorMsgs = err.json().errors;
        return;
      }
    }
    );
  }

  editUser({ value, valid }) {
    this.errorMsgs = null;
    if (!valid) {
      this.requiredMsg = true;
      return;
    }
    for (let i = 0; i < this.userRoles.length; i++) {
      this.user[`roles[${i}]`] = this.userRoles[i];
    }
    this._UsersService.updateUser(this.user).subscribe(data => {
      let response = data;
      this.router.navigate(['/users']).then(() => {
        this.toastr.successToastr(data['data']['message'], 'Success!');
      })
    }, (err) => {
      // this.toastr.error("Error While updating user...");
      if (err.json().errors) {
        this.errorMsgs = err.json().errors;
        return;
      }
    }
    );
  }


  ngOnInit() {
    this.user.id = this.activatedRoute.snapshot.queryParams['id'] || null;

    if (this.user.id)
      this.edit = true;

    if (this.edit == true) {
      this.authenticationService.getUser(this.user.id, this.token).subscribe(data => {
        this._UsersService.getRoles().subscribe(res => {
          this.roles = res.data;
        })
        let response = data;
        this.user.id = response.data.id;
        this.user.email = response.data.email;
        this.user.name = response.data.name;
        for (let i = 0; i < response.data.roles.length; i++) {
          this.userRoles.push(response.data.roles[i].id + '');
          console.log(this.userRoles)
        }
      });
    }
  }

}
