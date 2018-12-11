import { TestBed } from '@angular/core/testing';

import { CuentaCorrienteService } from './cuenta-corriente.service';

describe('CuentaCorrienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaCorrienteService = TestBed.get(CuentaCorrienteService);
    expect(service).toBeTruthy();
  });
});
