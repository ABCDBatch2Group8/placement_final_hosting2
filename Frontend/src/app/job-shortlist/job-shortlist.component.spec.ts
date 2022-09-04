import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobShortlistComponent } from './job-shortlist.component';

describe('JobShortlistComponent', () => {
  let component: JobShortlistComponent;
  let fixture: ComponentFixture<JobShortlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobShortlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobShortlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
