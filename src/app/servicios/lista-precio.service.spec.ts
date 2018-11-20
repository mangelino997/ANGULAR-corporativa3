import { TestBed } from '@angular/core/testing';

import { ListaPrecioService } from './lista-precio.service';

describe('ListaPrecioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaPrecioService = TestBed.get(ListaPrecioService);
    expect(service).toBeTruthy();
  });
});
