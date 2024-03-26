import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDeliverypartnerComponent } from './assign-deliverypartner.component';

describe('AssignDeliverypartnerComponent', () => {
  let component: AssignDeliverypartnerComponent;
  let fixture: ComponentFixture<AssignDeliverypartnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignDeliverypartnerComponent]
    });
    fixture = TestBed.createComponent(AssignDeliverypartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
