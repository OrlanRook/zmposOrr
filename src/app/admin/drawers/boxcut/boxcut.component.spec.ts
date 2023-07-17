import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxcutComponent } from './boxcut.component';

describe('BoxcutComponent', () => {
  let component: BoxcutComponent;
  let fixture: ComponentFixture<BoxcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxcutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
