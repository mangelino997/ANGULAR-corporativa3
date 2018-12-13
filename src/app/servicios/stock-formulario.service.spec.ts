import { TestBed } from '@angular/core/testing';

import { StockFormularioService } from './stock-formulario.service';

describe('StockFormularioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockFormularioService = TestBed.get(StockFormularioService);
    expect(service).toBeTruthy();
  });
});
