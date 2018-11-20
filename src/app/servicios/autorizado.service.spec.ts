import { TestBed } from '@angular/core/testing';

import { AutorizadoService } from './autorizado.service';

describe('AutorizadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutorizadoService = TestBed.get(AutorizadoService);
    expect(service).toBeTruthy();
  });
});
