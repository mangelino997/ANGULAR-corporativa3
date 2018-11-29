import { TestBed } from '@angular/core/testing';

import { ListaPrecioCompraService } from './lista-precio-compra.service';

describe('ListaPrecioCompraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaPrecioCompraService = TestBed.get(ListaPrecioCompraService);
    expect(service).toBeTruthy();
  });
});
