import { TestBed } from '@angular/core/testing';

import { ClientePropioService } from './cliente-propio.service';

describe('ClientePropioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientePropioService = TestBed.get(ClientePropioService);
    expect(service).toBeTruthy();
  });
});
