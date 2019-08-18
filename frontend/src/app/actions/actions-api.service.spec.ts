import { TestBed } from '@angular/core/testing';

import { ActionsApiService } from './actions-api.service';

describe('ActionsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionsApiService = TestBed.get(ActionsApiService);
    expect(service).toBeTruthy();
  });
});
