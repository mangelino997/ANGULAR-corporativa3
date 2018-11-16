import { TestBed } from '@angular/core/testing';

import { PestaniaService } from './pestania.service';

describe('PestaniaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PestaniaService = TestBed.get(PestaniaService);
    expect(service).toBeTruthy();
  });
});
