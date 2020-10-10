import { Component, OnInit , AfterViewInit } from '@angular/core';
import { GlobalEventsManager } from './../../helper/global-events';
import { TranslateService } from '@ngx-translate/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  navShow:boolean;
  usersTitle:string;
  ROUTES:RouteInfo[];


  showNavBar: boolean = false;  
  
  
      constructor(private globalEventsManager: GlobalEventsManager
        ,private _translateService: TranslateService) { 
          this.globalEventsManager.showNavBarEmitter.subscribe((mode)=>{
              this.showNavBar = mode;
          });
          
      }
  

  ngOnInit() {
    setTimeout(() => {
      this._translateService.get('sidebar').subscribe((res: string) => {
        this.usersTitle = res['users'];
    });
    this.ROUTES= [
      { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
      { path: 'users', title: this.usersTitle,  icon:'account_circle', class: '' },
      
    ];
      }, 500);
  }
  
  ngAfterViewInit() {
}
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
