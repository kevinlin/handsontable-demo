import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunSummaryComponent } from './run-summary.component';

describe('RunSummaryComponent', () => {
  let component: RunSummaryComponent;
  let fixture: ComponentFixture<RunSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
