import { TestBed } from '@angular/core/testing';

import { DevicesApiService } from './devices-api.service';

describe('DevicesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevicesApiService = TestBed.get(DevicesApiService);
    expect(service).toBeTruthy();
  });
});
