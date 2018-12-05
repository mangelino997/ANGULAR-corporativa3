import { TestBed } from '@angular/core/testing';

import { ListaPrecioVentaService } from './lista-precio-venta.service';

describe('ListaPrecioVentaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaPrecioVentaService = TestBed.get(ListaPrecioVentaService);
    expect(service).toBeTruthy();
  });
});
