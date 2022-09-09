import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplnStatusComponent } from './job-appln-status.component';

describe('JobApplnStatusComponent', () => {
  let component: JobApplnStatusComponent;
  let fixture: ComponentFixture<JobApplnStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplnStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplnStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
