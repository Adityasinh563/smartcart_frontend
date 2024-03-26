import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverypartnerComponent } from './deliverypartner.component';

describe('DeliverypartnerComponent', () => {
  let component: DeliverypartnerComponent;
  let fixture: ComponentFixture<DeliverypartnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliverypartnerComponent]
    });
    fixture = TestBed.createComponent(DeliverypartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
