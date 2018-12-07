import { TestBed } from '@angular/core/testing';

import { FacturaCompraService } from './factura-compra.service';

describe('FacturaCompraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacturaCompraService = TestBed.get(FacturaCompraService);
    expect(service).toBeTruthy();
  });
});
