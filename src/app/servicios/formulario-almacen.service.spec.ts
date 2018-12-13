import { TestBed } from '@angular/core/testing';

import { FormularioAlmacenService } from './formulario-almacen.service';

describe('FormularioAlmacenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormularioAlmacenService = TestBed.get(FormularioAlmacenService);
    expect(service).toBeTruthy();
  });
});
