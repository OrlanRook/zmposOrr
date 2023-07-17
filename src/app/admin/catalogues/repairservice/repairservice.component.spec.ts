import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairserviceComponent } from './repairservice.component';

describe('RepairserviceComponent', () => {
  let component: RepairserviceComponent;
  let fixture: ComponentFixture<RepairserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
