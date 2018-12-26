import { TestBed } from '@angular/core/testing';

import { GuardiaService } from './guardia.service';

describe('GuardiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuardiaService = TestBed.get(GuardiaService);
    expect(service).toBeTruthy();
  });
});
