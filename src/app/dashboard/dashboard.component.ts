import { Component, OnInit } from '@angular/core';
import Swiper from "swiper";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  swiperConfig;
  constructor() {
    setTimeout(() => {
      this.swiperConfig = {
        spaceBetween: 0,
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      };
    });
  }

  ngOnInit() {
      
  }

}
