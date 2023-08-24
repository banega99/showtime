import { TestBed } from '@angular/core/testing';

import { DataResolveService } from './data-resolve.service';

describe('DataResolveService', () => {
  let service: DataResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
