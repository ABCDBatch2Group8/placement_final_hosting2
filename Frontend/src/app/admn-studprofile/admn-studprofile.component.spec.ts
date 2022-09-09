import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmnStudprofileComponent } from './admn-studprofile.component';

describe('AdmnStudprofileComponent', () => {
  let component: AdmnStudprofileComponent;
  let fixture: ComponentFixture<AdmnStudprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmnStudprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmnStudprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
