import { TestBed } from '@angular/core/testing';

import { ModuloService } from './modulo.service';

describe('ModuloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuloService = TestBed.get(ModuloService);
    expect(service).toBeTruthy();
  });
});
