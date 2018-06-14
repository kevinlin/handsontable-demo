import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalOrdersComponent } from './vertical-orders.component';

describe('VerticalOrdersComponent', () => {
  let component: VerticalOrdersComponent;
  let fixture: ComponentFixture<VerticalOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
