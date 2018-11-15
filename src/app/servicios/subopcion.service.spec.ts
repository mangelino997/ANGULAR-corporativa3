import { TestBed } from '@angular/core/testing';

import { SubopcionService } from './subopcion.service';

describe('SubopcionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubopcionService = TestBed.get(SubopcionService);
    expect(service).toBeTruthy();
  });
});
