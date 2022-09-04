import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmnAddemployerComponent } from './admn-addemployer.component';

describe('AdmnAddemployerComponent', () => {
  let component: AdmnAddemployerComponent;
  let fixture: ComponentFixture<AdmnAddemployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmnAddemployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmnAddemployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
