import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdsomeSettingsComponent } from './ordsome-settings.component';

describe('OrdsomeSettingsComponent', () => {
  let component: OrdsomeSettingsComponent;
  let fixture: ComponentFixture<OrdsomeSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdsomeSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdsomeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
