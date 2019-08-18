import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnActionPanelComponent } from './btn-action-panel.component';

describe('BtnActionPanelComponent', () => {
  let component: BtnActionPanelComponent;
  let fixture: ComponentFixture<BtnActionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnActionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnActionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
