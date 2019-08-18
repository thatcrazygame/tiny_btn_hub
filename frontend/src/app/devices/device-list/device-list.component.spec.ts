import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesGroupsComponent } from './devices-groups.component';

describe('DevicesGroupsComponent', () => {
  let component: DevicesGroupsComponent;
  let fixture: ComponentFixture<DevicesGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
