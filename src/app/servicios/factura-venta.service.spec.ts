import { TestBed } from '@angular/core/testing';

import { FacturaVentaService } from './factura-venta.service';

describe('FacturaVentaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacturaVentaService = TestBed.get(FacturaVentaService);
    expect(service).toBeTruthy();
  });
});
