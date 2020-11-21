import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from "swiper";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  swiperConfig;
  login;
  constructor(public router: Router) {
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
    this.login = localStorage.getItem('drchefToken') ? true : false;
  }

  logout(){
    localStorage.setItem("drchefToken",'');
    this.router.navigate(["/login"]);
  }

}
