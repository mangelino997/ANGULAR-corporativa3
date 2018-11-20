import { TestBed } from '@angular/core/testing';

import { BilleteService } from './billete.service';

describe('BilleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BilleteService = TestBed.get(BilleteService);
    expect(service).toBeTruthy();
  });
});
