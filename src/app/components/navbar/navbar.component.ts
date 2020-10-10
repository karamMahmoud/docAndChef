import { Component, OnInit, ElementRef } from '@angular/core';
// import { ROUTES } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AuthenticationService } from '../../helper/services.api';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    // private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    showNav:boolean;
    selectedLang = localStorage.getItem("lang") || 'en'

    constructor(private translate: TranslateService,private route:Router,private authenticationService : AuthenticationService ,location: Location,  private element: ElementRef,private router:Router) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){
      // this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      if(!localStorage.getItem("esSpartkToken")){
        this.showNav=false;
      }else{
        this.showNav=true;
      }
    }
    onHidden(): void {
      console.log('Dropdown is hidden');
    }
    onShown(): void {
      console.log('Dropdown is shown');
    }
    isOpenChange(): void {
      console.log('Dropdown state is changed');
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    logout(){
        this.authenticationService.logout().subscribe(data =>{
            let response = data;
            localStorage.removeItem("etSparkToken");
            this.router.navigate([`./login`]);
                }, (err) => {
                  if (err === 'Unauthorized') { 
                      // this.toastr.error('wrong email or password', 'Fail!');
              }
                  if (err === 'missingData') { 
                    // this.toastr.error('missed data', 'Fail!');
                  }
                  if (err === 'serverError') { 
                    // this.toastr.error('server error', 'Fail!');
                  }
                  if (err === 'internetConnection') { 
                    // this.toastr.error('check your internert connction', 'Fail!');
                  }
                  if (err === 'toManyAttemps') { 
                    // this.toastr.error('too many attemps', 'Fail!');
                  }
            }
            );
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    change(lang){
      if(localStorage.getItem('lang') != lang){
        this.selectedLang = lang;
        this.translate.use(lang);
        localStorage.setItem('lang',lang)
        location.reload();
      }
    };

    loadStyleSheet(id, url) {

      // var head = document.getElementsByTagName('head')[0];
      // var link = document.createElement('link');
      // link.id = id;
      // link.rel = 'stylesheet';
      // link.type = 'text/css';
      // link.href = url;
      // link.media = 'all';
      // head.appendChild(link);
  }
  
    getTitle(){
        let  index=this.router.url.substr(1).indexOf("/");
        if(index == -1)
        return this.router.url.substr(1);
        else
        return this.router.url.substr(1).slice(0,index);
    }
}
