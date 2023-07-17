import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReEntryComponent } from './re-entry.component';

describe('ReEntryComponent', () => {
  let component: ReEntryComponent;
  let fixture: ComponentFixture<ReEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
