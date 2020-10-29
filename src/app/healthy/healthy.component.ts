import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-healthy',
  templateUrl: './healthy.component.html',
  styleUrls: ['./healthy.component.scss']
})
export class HealthyComponent implements OnInit {
  plan = 1;
  toggle = 'account';
  constructor() { }

  ngOnInit() {
      
  }

}
