import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpendrawerComponent } from './opendrawer.component';

describe('OpendrawerComponent', () => {
  let component: OpendrawerComponent;
  let fixture: ComponentFixture<OpendrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpendrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpendrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
