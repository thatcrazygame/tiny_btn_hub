import { TestBed } from '@angular/core/testing';

import { CommandsApiService } from './commands-api.service';

describe('CommandsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommandsApiService = TestBed.get(CommandsApiService);
    expect(service).toBeTruthy();
  });
});
