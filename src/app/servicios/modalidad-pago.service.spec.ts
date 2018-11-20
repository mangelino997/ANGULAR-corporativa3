import { TestBed } from '@angular/core/testing';

import { ModalidadPagoService } from './modalidad-pago.service';

describe('ModalidadPagoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalidadPagoService = TestBed.get(ModalidadPagoService);
    expect(service).toBeTruthy();
  });
});
