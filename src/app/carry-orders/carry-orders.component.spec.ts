import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarryOrdersComponent } from './carry-orders.component';

describe('CarryOrdersComponent', () => {
  let component: CarryOrdersComponent;
  let fixture: ComponentFixture<CarryOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarryOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
