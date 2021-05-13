import { TestBed } from '@angular/core/testing';

import { DatablogsService } from './datablogs.service';

describe('DatablogsService', () => {
  let service: DatablogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatablogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
