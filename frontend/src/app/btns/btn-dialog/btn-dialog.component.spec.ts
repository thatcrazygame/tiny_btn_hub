import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDialogComponent } from './btn-dialog.component';

describe('BtnDialogComponent', () => {
  let component: BtnDialogComponent;
  let fixture: ComponentFixture<BtnDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
