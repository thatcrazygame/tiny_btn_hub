import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandArgPanelComponent } from './command-arg-panel.component';

describe('CommandArgPanelComponent', () => {
  let component: CommandArgPanelComponent;
  let fixture: ComponentFixture<CommandArgPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandArgPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandArgPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
