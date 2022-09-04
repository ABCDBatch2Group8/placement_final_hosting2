import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmnJobsComponent } from './admn-jobs.component';

describe('AdmnJobsComponent', () => {
  let component: AdmnJobsComponent;
  let fixture: ComponentFixture<AdmnJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmnJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmnJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
