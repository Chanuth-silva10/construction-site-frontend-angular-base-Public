import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSupplierComponent } from './all-supplier.component';

describe('AllSupplierComponent', () => {
  let component: AllSupplierComponent;
  let fixture: ComponentFixture<AllSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
