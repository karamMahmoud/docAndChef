
import { Component, OnInit, ContentChild,ViewChild, AfterViewInit, ElementRef } from '@angular/core';

declare const $: any;

@Component({
  selector: 'base-root',
  templateUrl: './base.component.html',
})
export class BaseComponent {
  showNavBar: boolean = false;


  changeOfRoutes(){
    if(localStorage.getItem("etSparkToken")){
        (document.querySelector('.main-panel') as HTMLElement).style.width = '';
        this.showNavBar=true;
        
    }else{
        (document.querySelector('.main-panel') as HTMLElement).style.width = '100%';
        this.showNavBar=false;
    }
}
}
