import { TestBed } from '@angular/core/testing';

import { TipoFormularioService } from './tipo-formulario.service';

describe('TipoFormularioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoFormularioService = TestBed.get(TipoFormularioService);
    expect(service).toBeTruthy();
  });
});
