import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedrawerComponent } from './closedrawer.component';

describe('ClosedrawerComponent', () => {
  let component: ClosedrawerComponent;
  let fixture: ComponentFixture<ClosedrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosedrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
