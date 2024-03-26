import { TestBed } from '@angular/core/testing';

import { DeliverypartnerService } from './deliverypartner.service';

describe('DeliverypartnerService', () => {
  let service: DeliverypartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverypartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
