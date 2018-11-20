import { TestBed } from '@angular/core/testing';

import { TipoFacturaService } from './tipo-factura.service';

describe('TipoFacturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoFacturaService = TestBed.get(TipoFacturaService);
    expect(service).toBeTruthy();
  });
});
