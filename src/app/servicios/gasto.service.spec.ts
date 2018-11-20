import { TestBed } from '@angular/core/testing';

import { GastoService } from './gasto.service';

describe('GastoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GastoService = TestBed.get(GastoService);
    expect(service).toBeTruthy();
  });
});
