import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudJobhistoryComponent } from './stud-jobhistory.component';

describe('StudJobhistoryComponent', () => {
  let component: StudJobhistoryComponent;
  let fixture: ComponentFixture<StudJobhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudJobhistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudJobhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
