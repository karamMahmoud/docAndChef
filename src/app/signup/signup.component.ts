import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "app/helper/services.api";
import * as moment from "moment";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-signup",
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
      transition(":leave", [
        // :leave is alias to '* => void'
        animate(0, style({ opacity: 0 })),
      ]),
    ]),
    // trigger(
    //   'enterAnimation', [
    //     transition(':enter', [
    //       style({transform: 'translateX(100%)', opacity: 0}),
    //       animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
    //     ]),
    //     transition(':leave', [
    //       style({transform: 'translateX(0)', opacity: 1}),
    //       animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
    //     ])
    //   ]
    // )
  ],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  start_date: any;
  tomorrow;
  today;
  disabledDayes=[];
  weight;
  carbs = [];
  proteins = [];
  delivery_time: any;
  startInit = new Date();
  totalPrice = 0;
  plan = 1;
  customBreakfast = "breakfast";
  signupLoader = false;
  setPackagesLoader = false;
  mainCoursePrice;
  selectedMainCourse;
  mainCourseCarb;
  pacakges;
  bodyBuildingLevel;
  payload = {
    name: "",
    email: "",
    phone: "",
    address: "",
    area: "",
    plot: "",
    street: "",
    building_no: "",
    district: "",
    floor: "",
    flat_no: "",
    address_notes: "",
    age: "",
    height: "",
    weight: "",
    allergies: "",
    gender: "",
  };
  packagePayloadNormal = {
    client_id: "",
    package_id: "",
    breakfast: "",
    main_course: "",
    snacks: "",
    protein_snacks: null,
    fruit: null,
    salad: null,
    carb: "",
    protein: "",
    total_price: "",
  };
  packagePayloadBodyBuilding = {
    client_id: "",
    package_id: "",
    breakfast: "",
    main_course: "",
    snacks: "",
    protein_snacks: null,
    fruit: null,
    salad: null,
    carb: "",
    protein: "",
    total_price: "",
  };
  packagePayloadCustom = {
    client_id: "",
    package_id: "",
    breakfast: 0,
    main_course: 0,
    snacks: 0,
    protein_snacks: 0,
    fruit: 0,
    salad: 0,
    carb: 0,
    protein: 0,
    custom_breakfasts: [],
    total_price: 0,
  };
  requiredMsg1 = false;
  requiredMsg2 = false;
  requiredMsg3 = false;
  requiredMsg4 = false;
  loading = false;
  renew = false;
  currentStep = 1;
  constructor(
    public toastr: ToastrManager,
    private route: ActivatedRoute,
    public router: Router,
    private translate: TranslateService,
    private api: AuthenticationService
  ) {}

  ngOnInit() {
    this.today = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(new Date().getDate() + 1);
    this.disabledDayes= [this.tomorrow,this.today];
    this.route.queryParams.subscribe((res) => {
      if (res.package) {
        if (res.package === "renew" || res.package === "expired")
          this.renew = true;
        this.currentStep = 4;
        this.packagePayloadNormal.client_id = localStorage.getItem("clientId");
        this.packagePayloadBodyBuilding.client_id = localStorage.getItem(
          "clientId"
        );
        this.packagePayloadCustom.client_id = localStorage.getItem("clientId");
      }
    });

    this.api.packages().subscribe((data) => {
      this.pacakges = data.data;
      this.pacakges.custom.meals.custom_breakfast.forEach((breakfast, i) => {
        this.packagePayloadCustom.custom_breakfasts[i] = {
          id: breakfast.id,
          qty: 0,
        };
      });
      this.setPlan(1);
      const proteins = [];
      this.pacakges?.custom?.meals?.main_course?.prices.map((price) => {
        if (
          !proteins.find(
            (protein) => protein.variants.protein === price.variants.protein
          )
        )
          proteins.push(price);
      });
      this.proteins = proteins;
    });
  }

  selectPrice(plan) {
    this.bodyBuildingLevel = plan;
    this.packagePayloadBodyBuilding.total_price = this.bodyBuildingLevel.price;
  }

  firstForm({ value, valid }) {
    this.requiredMsg1 = true;
    valid ? (this.currentStep = 2) : "";
    // this.payload.dob = moment(this.payload.dob).format("YYYY-MM-DD");
  }
  change(lang){
    if(localStorage.getItem('lang') != lang){
      // this.selectedLang = lang;
      this.translate.use(lang);
      localStorage.setItem('lang',lang)
      location.reload();
    }
  };
  secondForm({ value, valid }) {
    this.requiredMsg2 = true;
    valid ? (this.currentStep = 3) : "";
  }

  thirdForm({ value, valid }) {
    this.requiredMsg3 = true;
    if (valid) {
      this.signupLoader = true;
      this.api.signup(this.payload).subscribe(
        (data) => {
          localStorage.setItem("clientId", data.data.client_id);
          localStorage.setItem("drchefToken", data.data.token);
          this.signupLoader = false;
          this.packagePayloadNormal.client_id = data.data.client_id;
          this.packagePayloadBodyBuilding.client_id = data.data.client_id;
          this.packagePayloadCustom.client_id = data.data.client_id;
          this.currentStep = 4;
          // this.toast.successToastr("Created successfully!");
          // this.currentStep = 5;
        },
        (err) => {
          this.signupLoader = false;
          this.toastr.errorToastr(err.error.messages.email ?? err.error.messages.phone ?? err.error.messages);
        }
      );
    }
  }

  fourthForm({ value, valid }) {
    this.requiredMsg4 = true;
    this.loading = true;
  }

  setPlan(plan) {
    this.plan = plan;
    if (this.plan === 1) {
      this.packagePayloadNormal.total_price = this.pacakges.normal.price;
    }
  }

  setPackages() {
    let payload;
    if (this.plan === 1) {
      this.packagePayloadNormal.package_id = this.pacakges.normal.id;
      this.packagePayloadNormal.breakfast = this.pacakges.normal.meals.breakfast.quantity;
      this.packagePayloadNormal.main_course = this.pacakges.normal.meals.main_course.quantity;
      this.packagePayloadNormal.snacks = this.pacakges.normal.meals.snacks.quantity;
      this.packagePayloadNormal.total_price = this.pacakges.normal.price;
      payload = this.packagePayloadNormal;
    } else if (this.plan === 2) {
      this.packagePayloadBodyBuilding.package_id = this.pacakges[
        "body buiding"
      ].id;
      this.packagePayloadBodyBuilding.breakfast = this.pacakges[
        "body buiding"
      ].meals.breakfast.quantity;
      this.packagePayloadBodyBuilding.main_course = this.pacakges[
        "body buiding"
      ].meals.main_course.quantity;
      this.packagePayloadBodyBuilding.snacks = this.pacakges[
        "body buiding"
      ].meals.snacks.quantity;
      this.packagePayloadBodyBuilding.total_price = this.bodyBuildingLevel.price;
      this.packagePayloadBodyBuilding.carb = this.bodyBuildingLevel.carb;
      this.packagePayloadBodyBuilding.protein = this.bodyBuildingLevel.protein;
      payload = this.packagePayloadBodyBuilding;
    } else if (this.plan === 3) {
      this.packagePayloadCustom.package_id = this.pacakges.custom.id;
      payload = this.packagePayloadCustom;
    }
    this.setPackagesLoader = true;
    payload.start_date = this.start_date;
    payload.delivery_time = this.delivery_time;
    this.api.setPackages(payload).subscribe(
      (data) => {
        this.setPackagesLoader = false;
        this.currentStep = 6;
      },
      (err) => {
        this.setPackagesLoader = false;
        this.toastr.errorToastr(err.error.messages);
      }
    );
  }

  renewPackage() {
    let payload;
    if (this.plan === 1) {
      this.packagePayloadNormal.package_id = this.pacakges.normal.id;
      // this.packagePayloadNormal.breakfast = this.pacakges.normal.meals.breakfast.quantity;
      this.packagePayloadNormal.main_course = this.pacakges.normal.meals.main_course.quantity;
      this.packagePayloadNormal.snacks = this.pacakges.normal.meals.snacks.quantity;
      this.packagePayloadNormal.total_price = this.pacakges.normal.price;
      payload = this.packagePayloadNormal;
    } else if (this.plan === 2) {
      this.packagePayloadBodyBuilding.package_id = this.pacakges[
        "body buiding"
      ].id;
      this.packagePayloadBodyBuilding.breakfast = this.pacakges[
        "body buiding"
      ].meals.breakfast.quantity;
      this.packagePayloadBodyBuilding.main_course = this.pacakges[
        "body buiding"
      ].meals.main_course.quantity;
      this.packagePayloadBodyBuilding.snacks = this.pacakges[
        "body buiding"
      ].meals.snacks.quantity;
      this.packagePayloadBodyBuilding.total_price = this.bodyBuildingLevel.price;
      this.packagePayloadBodyBuilding.carb = this.bodyBuildingLevel.carb;
      this.packagePayloadBodyBuilding.protein = this.bodyBuildingLevel.protein;
      payload = this.packagePayloadBodyBuilding;
    } else if (this.plan === 3) {
      this.packagePayloadCustom.package_id = this.pacakges.custom.id;
      payload = this.packagePayloadCustom;
    }
    this.setPackagesLoader = true;
    payload.start_date = this.start_date;
    payload.delivery_time = this.delivery_time;
    this.api.renewPackages({ ...payload, weight: this.weight }).subscribe(
      (data) => {
        this.setPackagesLoader = false;
        this.currentStep = 6;
      },
      (err) => {
        this.setPackagesLoader = false;
        this.toastr.errorToastr("Please set your program");
        // this.toastr.errorToastr(err.error.messages);
      }
    );
  }

  changeBreackFast(breakfast) {
    this.customBreakfast = breakfast;
    if (breakfast === "customBreakfast") {
      this.packagePayloadCustom.breakfast = 0;
      this.setCustomPrice();
    } else {
      this.packagePayloadCustom.custom_breakfasts[0]
        ? (this.packagePayloadCustom.custom_breakfasts[0].qty = 0)
        : "";
      this.packagePayloadCustom.custom_breakfasts[1]
        ? (this.packagePayloadCustom.custom_breakfasts[1].qty = 0)
        : "";
      this.packagePayloadCustom.custom_breakfasts[2]
        ? (this.packagePayloadCustom.custom_breakfasts[2].qty = 0)
        : "";
      this.setCustomPrice();
    }
  }

  setProtien() {
    this.packagePayloadCustom.protein = this.mainCourseCarb.variants.protein;
    this.mainCoursePrice = null;
    this.carbs = [];
    this.selectedMainCourse = this.pacakges?.custom?.meals?.main_course?.prices.find(
      (price) => price.variants.protein === this.packagePayloadCustom.protein
    );
    for (let i = 50; i <= this.packagePayloadCustom.protein + 50; i = i + 50)
      this.carbs.push(i);
  }
  setCarp(e) {
    this.packagePayloadCustom.carb = e;
  }
  setCustomPrice() {
    this.packagePayloadCustom.total_price =
      this.mainCoursePrice?.price ||
      0 +
        this.packagePayloadCustom.fruit *
          this.pacakges.custom.meals.fruit.price +
        this.packagePayloadCustom.salad *
          this.pacakges.custom.meals.salad.price +
        this.packagePayloadCustom.protein_snacks *
          this.pacakges.custom.meals.protein_snacks.price +
        this.packagePayloadCustom.custom_breakfasts[0].qty *
          this.pacakges.custom.meals.custom_breakfast[0].price +
        this.packagePayloadCustom.custom_breakfasts[1].qty *
          this.pacakges.custom.meals.custom_breakfast[1].price +
        this.packagePayloadCustom.custom_breakfasts[2].qty *
          this.pacakges.custom.meals.custom_breakfast[2].price +
        this.packagePayloadCustom.breakfast *
          this.pacakges.custom.meals.breakfast.price +
        this.packagePayloadCustom.snacks *
          this.pacakges.custom.meals.snacks.price;
    this.packagePayloadCustom.main_course =
      this.mainCoursePrice?.no_of_meals || 0;
  }
  customQuantity(meal, operator) {
    if (meal !== 0 && meal !== 1 && meal !== 2) {
      if (!(this.packagePayloadCustom[meal] === 0 && operator === "-")) {
        if (this.packagePayloadCustom[meal] === 5 && operator === "+") {
          this.toastr.errorToastr("Max number is 5");
          return;
        }
        this.packagePayloadCustom[meal] =
          operator === "+"
            ? this.packagePayloadCustom[meal] + 1
            : this.packagePayloadCustom[meal] - 1;
      }
    } else {
      if (
        !(
          this.packagePayloadCustom.custom_breakfasts[meal].qty === 0 &&
          operator === "-"
        )
      ) {
        // debugger;
        if (meal === 2) {
          if (
            this.packagePayloadCustom.custom_breakfasts[2].qty === 1 &&
            operator === "+"
          ) {
            this.toastr.errorToastr("Max number is 1");
            return;
          }
          this.packagePayloadCustom.custom_breakfasts[meal].qty =
            operator === "+"
              ? this.packagePayloadCustom.custom_breakfasts[meal].qty + 1
              : this.packagePayloadCustom.custom_breakfasts[meal].qty - 1;
        } else {
          if (
            this.packagePayloadCustom.custom_breakfasts[meal].qty === 10 &&
            operator === "+"
          ) {
            this.toastr.errorToastr("Max number is 10");
            return;
          }
          this.packagePayloadCustom.custom_breakfasts[meal].qty =
            operator === "+"
              ? this.packagePayloadCustom.custom_breakfasts[meal].qty + 1
              : this.packagePayloadCustom.custom_breakfasts[meal].qty - 1;
        }
      }
    }
    this.packagePayloadCustom.total_price =
      this.packagePayloadCustom.fruit * this.pacakges.custom.meals.fruit.price +
      this.packagePayloadCustom.salad * this.pacakges.custom.meals.salad.price +
      this.packagePayloadCustom.protein_snacks *
        this.pacakges.custom.meals.protein_snacks.price +
      this.packagePayloadCustom.breakfast *
        this.pacakges.custom.meals.breakfast.price +
      this.packagePayloadCustom.custom_breakfasts[0].qty *
        this.pacakges.custom.meals.custom_breakfast[0].price +
      this.packagePayloadCustom.custom_breakfasts[1].qty *
        this.pacakges.custom.meals.custom_breakfast[1].price +
      this.packagePayloadCustom.custom_breakfasts[2].qty *
        this.pacakges.custom.meals.custom_breakfast[2].price +
      this.packagePayloadCustom.snacks *
        this.pacakges.custom.meals.snacks.price;
    if (this.mainCoursePrice?.price) {
      this.packagePayloadCustom.total_price =
        this.packagePayloadCustom.total_price + this.mainCoursePrice.price;
    }
  }

  setStartDayValue(e) {
    this.start_date = moment(e).format("DD-MM-YYYY");
    console.log(this.start_date);
  }
}
