import { TestBed } from '@angular/core/testing';

import { BtnsApiService } from './btns-api.service';

describe('BtnsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BtnsApiService = TestBed.get(BtnsApiService);
    expect(service).toBeTruthy();
  });
});
