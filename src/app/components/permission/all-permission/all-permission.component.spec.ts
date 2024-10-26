import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPermissionComponent } from './all-permission.component';

describe('AllPermissionComponent', () => {
  let component: AllPermissionComponent;
  let fixture: ComponentFixture<AllPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
