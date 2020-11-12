import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthyComponent } from './healthy.component';

describe('DashboardComponent', () => {
  let component: HealthyComponent;
  let fixture: ComponentFixture<HealthyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});