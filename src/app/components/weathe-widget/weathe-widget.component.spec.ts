import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatheWidgetComponent } from './weathe-widget.component';

describe('WeatheWidgetComponent', () => {
  let component: WeatheWidgetComponent;
  let fixture: ComponentFixture<WeatheWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatheWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatheWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
