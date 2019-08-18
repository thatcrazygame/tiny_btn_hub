import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSnackComponent } from './btn-snack.component';

describe('BtnSnackComponent', () => {
  let component: BtnSnackComponent;
  let fixture: ComponentFixture<BtnSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
