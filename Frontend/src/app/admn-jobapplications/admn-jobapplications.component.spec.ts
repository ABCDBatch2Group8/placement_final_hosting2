import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmnJobapplicationsComponent } from './admn-jobapplications.component';

describe('AdmnJobapplicationsComponent', () => {
  let component: AdmnJobapplicationsComponent;
  let fixture: ComponentFixture<AdmnJobapplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmnJobapplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmnJobapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
