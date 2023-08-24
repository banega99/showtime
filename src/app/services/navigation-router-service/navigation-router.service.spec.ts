import { TestBed } from '@angular/core/testing';

import { NavigationRouterService } from './navigation-router.service';

describe('NavigationRouterService', () => {
  let service: NavigationRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
