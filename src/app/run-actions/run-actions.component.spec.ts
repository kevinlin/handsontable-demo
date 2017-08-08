import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunActionsComponent } from './run-actions.component';

describe('RunActionsComponent', () => {
  let component: RunActionsComponent;
  let fixture: ComponentFixture<RunActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
