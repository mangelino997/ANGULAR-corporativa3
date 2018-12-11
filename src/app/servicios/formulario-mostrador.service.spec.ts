import { TestBed } from '@angular/core/testing';

import { FormularioMostradorService } from './formulario-mostrador.service';

describe('FormularioMostradorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormularioMostradorService = TestBed.get(FormularioMostradorService);
    expect(service).toBeTruthy();
  });
});
