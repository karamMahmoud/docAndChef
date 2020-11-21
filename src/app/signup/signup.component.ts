import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "app/helper/services.api";
import { ToastrManager } from 'ng6-toastr-notifications';

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
  plan = 1;
  mainCoursePrice;
  mainCourseCarb;
  pacakges;
  bodyBuildingLevel;
  payload = {
    name: "",
    email: "",
    phone: "",
    address: "",
    area: "",
    street: "",
    building_no: "",
    height: "",
    weight: "",
    allergies: "",
  };
  packagePayloadNormal = {
    client_id: "",
    package_id: "",
    breakfast: "",
    main_course: "",
    snacks: "",
    protein_snacks: null,
    fruit: null,
    carb: "",
    protein: "",
    custom_breakfasts: "",
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
    carb: "",
    protein: "",
    custom_breakfasts: "",
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
    carb: 0,
    protein: 0,
    custom_breakfasts: "",
    total_price: 0,
  };
  requiredMsg1 = false;
  requiredMsg2 = false;
  requiredMsg3 = false;
  requiredMsg4 = false;
  loading = false;
  currentStep = 1;
  constructor(public toastr: ToastrManager,private api: AuthenticationService) {}

  ngOnInit() {
    this.api.packages().subscribe((data) => {
      this.pacakges = data.data;
    });
  }

  selectPrice(plan) {
    this.bodyBuildingLevel = plan;
  }

  firstForm({ value, valid }) {
    this.requiredMsg1 = true;
    valid ? (this.currentStep = 2) : "";
    // this.payload.dob = moment(this.payload.dob).format("YYYY-MM-DD");
  }

  secondForm({ value, valid }) {
    this.requiredMsg2 = true;
    valid ? (this.currentStep = 3) : "";
  }

  thirdForm({ value, valid }) {
    this.requiredMsg3 = true;
    if (valid) {
      this.api.signup(this.payload).subscribe(
        (data) => {
          this.loading = false;
          this.packagePayloadNormal.client_id = data.data.client_id;
          this.packagePayloadBodyBuilding.client_id = data.data.client_id;
          this.packagePayloadCustom.client_id = data.data.client_id;
          this.currentStep = 4;
          // this.toast.successToastr("Created successfully!");
          // this.currentStep = 5;
        },
        (err) => {
          // this.loading = false;
          // this.toast.errorToastr(err.error.data.errors[0]);
        }
      );
    }
  }

  fourthForm({ value, valid }) {
    this.requiredMsg4 = true;
    this.loading = true;
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
      this.packagePayloadBodyBuilding.package_id = this.pacakges.normal.id;
      this.packagePayloadBodyBuilding.breakfast = this.pacakges.normal.meals.breakfast.quantity;
      this.packagePayloadBodyBuilding.main_course = this.pacakges.normal.meals.main_course.quantity;
      this.packagePayloadBodyBuilding.snacks = this.pacakges.normal.meals.snacks.quantity;
      this.packagePayloadBodyBuilding.total_price = this.bodyBuildingLevel.price;
      this.packagePayloadBodyBuilding.carb = this.bodyBuildingLevel.carb;
      this.packagePayloadBodyBuilding.protein = this.bodyBuildingLevel.protein;
      payload = this.packagePayloadBodyBuilding;
    } else if (this.plan === 3) {
      this.packagePayloadCustom.package_id = this.pacakges.custom.id;
      console.log(this.packagePayloadCustom.total_price )
      this.packagePayloadCustom.total_price =
        this.packagePayloadCustom.total_price +
        this.packagePayloadCustom.fruit *
          this.pacakges.custom.meals.fruit.price +
        this.packagePayloadCustom.protein_snacks *
          this.pacakges.custom.meals.protein_snacks.price +
        this.packagePayloadCustom.breakfast *
          this.pacakges.custom.meals.breakfast.price +
        this.packagePayloadCustom.snacks *
          this.pacakges.custom.meals.snacks.price
      payload = this.packagePayloadCustom;
    }
    this.api.setPackages(payload).subscribe((data) => {
      this.currentStep = 6;
    });
  }
  setCarp() {
    this.packagePayloadCustom.carb = this.mainCourseCarb.variants.carb;
    this.packagePayloadCustom.protein = this.mainCourseCarb.variants.protein;
  }
  setCustomPrice() {
    this.packagePayloadCustom.total_price = this.mainCoursePrice.price;
    this.packagePayloadCustom.main_course = this.mainCoursePrice.no_of_meals;
  }
  customQuantity(meal, operator) {
    if (!(this.packagePayloadCustom[meal] === 0 && operator === "-")){
      if(this.packagePayloadCustom[meal] === 5 && operator === "5"){
        this.toastr.errorToastr("Max number is 5");
      }
      this.packagePayloadCustom[meal] =
        operator === "+"
          ? this.packagePayloadCustom[meal] + 1
          : this.packagePayloadCustom[meal] - 1;
    }
  }
}
