import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "app/helper/services.api";
import { animate, style, transition, trigger } from "@angular/animations";
import { ToastrManager } from 'ng6-toastr-notifications';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: "app-menus",
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(":leave", [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: "./menus.component.html",
  styleUrls: ["./menus.component.scss"],
})
export class MenusComponent implements OnInit {
  mealsLength: any = {};
  menus;
  loading = false;
  toppings = new FormControl();
  order;
  package: any = {};
  payload = {
    meals: [
      {
        day: 1,
        breakfast_ids: [],
        main_course_ids: [],
        snacks_ids: [],
        protein_snacks_ids: [],
        carb: 0, //total carbs of chosen main_course meals
        protein: 0, //total protein of chosen main_course meals
      },
      {
        day: 2,
        breakfast_ids: [],
        main_course_ids: [],
        snacks_ids: [],
        protein_snacks_ids: [],
        carb: 0, //total carbs of chosen main_course meals
        protein: 0, //total protein of chosen main_course meals
      },
      {
        day: 3,
        breakfast_ids: [],
        main_course_ids: [],
        snacks_ids: [],
        protein_snacks_ids: [],
        carb: 0, //total carbs of chosen main_course meals
        protein: 0, //total protein of chosen main_course meals
      },
      {
        day: 4,
        breakfast_ids: [],
        main_course_ids: [],
        snacks_ids: [],
        protein_snacks_ids: [],
        carb: 0, //total carbs of chosen main_course meals
        protein: 0, //total protein of chosen main_course meals
      },
      {
        day: 5,
        breakfast_ids: [],
        main_course_ids: [],
        snacks_ids: [],
        protein_snacks_ids: [],
        carb: 0, //total carbs of chosen main_course meals
        protein: 0, //total protein of chosen main_course meals
      },
      {
        day: 6,
        breakfast_ids: [],
        main_course_ids: [],
        snacks_ids: [],
        protein_snacks_ids: [],
        carb: 0, //total carbs of chosen main_course meals
        protein: 0, //total protein of chosen main_course meals
      },
      {
        day: 7,
        breakfast_ids: [],
        main_course_ids: [],
        snacks_ids: [],
        protein_snacks_ids: [],
        carb: 0, //total carbs of chosen main_course meals
        protein: 0, //total protein of chosen main_course meals
      },
    ],
    status: 0,
  };
  week = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  constructor(public router: Router,public toastr: ToastrManager,private api: AuthenticationService) {}

  ngOnInit() {
    this.api.menus().subscribe((data) => {
      this.menus = data.data;
    });
    this.api.getPackage().subscribe((data) => {
      this.package = data.data;
    });
    this.api.getOrder().subscribe((data) => {
      // this.package = data.data;
      if(data.data.length > 0)
      this.payload.meals = data.data;
      console.log(this.payload.meals);
    });
  }
  setMeal(meal) {
    this.mealsLength.name = "";
    setTimeout(() => {
      this.mealsLength = {
        count: meal.count,
        name: meal.name,
      };
    });
  }
  changed(limit,dayIndex,ids) {
    setTimeout(() => {
    if (this.payload.meals[dayIndex][ids].length > limit) {
      // this.payload.meals[dayIndex][ids] = this.toppings.value;
      // this.mySelections = this.toppings.value;
        this.payload.meals[dayIndex][ids] = this.payload.meals[dayIndex][ids].splice(-1,1)
      }
    }, 500);
}
  save() {
    let payload = {meals:[],status:0};
    payload.meals = this.payload.meals.map((day) => {
      return {
        ...day,
        breakfast_ids: day.breakfast_ids.filter((id) => id),
        main_course_ids: day.main_course_ids.filter((id) => id),
        snacks_ids: day.snacks_ids.filter((id) => id),
        protein_snacks_ids: day.protein_snacks_ids.filter((id) => id),
      };
    });
    this.loading = true;
    this.api.setOrder(payload).subscribe((data) => {
    this.loading = false;
      this.toastr.successToastr("Saved successfully");
    },err =>{
    this.loading = false;
    this.toastr.errorToastr(err.error.messages);
    });
  }
  savePerminent() {
    let payload = {meals:[],status:0};
    payload.meals = this.payload.meals.map((day) => {
      return {
        ...day,
        breakfast_ids: day.breakfast_ids.filter((id) => id),
        main_course_ids: day.main_course_ids.filter((id) => id),
        snacks_ids: day.snacks_ids.filter((id) => id),
        protein_snacks_ids: day.protein_snacks_ids.filter((id) => id),
      };
    });
    payload.status = 1;
    this.loading = true;
    this.api.setOrder(payload).subscribe((data) => {
    this.loading = false;
    this.toastr.successToastr("Saved successfully");
    },err =>{
    this.loading = false;
    this.toastr.errorToastr('Please fill all meals');
    });
  }

  logout(){
    localStorage.setItem("drchefToken",'');
    this.router.navigate(["/login"]);
  }
}
