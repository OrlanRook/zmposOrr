import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturntypeComponent } from './returntype.component';

describe('ReturntypeComponent', () => {
  let component: ReturntypeComponent;
  let fixture: ComponentFixture<ReturntypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturntypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturntypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
