import { TestBed } from '@angular/core/testing';

import { ManagingDbService } from './managing-db.service';

describe('ManagingDbService', () => {
  let service: ManagingDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagingDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
