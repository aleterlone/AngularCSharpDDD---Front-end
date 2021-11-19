import { TestBed } from '@angular/core/testing';

import { EscolaridadeService } from './escolaridade.service';

describe('EscolaridadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscolaridadeService = TestBed.get(EscolaridadeService);
    expect(service).toBeTruthy();
  });
});
