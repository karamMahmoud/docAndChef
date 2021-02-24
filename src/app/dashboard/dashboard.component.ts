import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swiper from "swiper";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  swiperConfig;
  login;
      selectedLang = '';
  constructor(public router: Router,
    private translate: TranslateService,
    ) {
    setTimeout(() => {
      this.swiperConfig = {
        spaceBetween: 0,
        slidesPerView: "1",
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };
    },200);
  }

  ngOnInit() {
      this.selectedLang = localStorage.getItem('lang');
    this.login = localStorage.getItem('drchefToken') ? true : false;
  }

  change(lang){
    if(localStorage.getItem('lang') != lang){
      // this.selectedLang = lang;
      this.translate.use(lang);
      localStorage.setItem('lang',lang)
      location.reload();
    }
  };

  logout(){
    localStorage.setItem("drchefToken",'');
    this.router.navigate(["/login"]);
  }

}
