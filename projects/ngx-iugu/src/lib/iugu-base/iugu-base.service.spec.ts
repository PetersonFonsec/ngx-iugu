import { TestBed } from '@angular/core/testing';

import { IuguBaseService } from './iugu-base.service';

describe('IuguBaseService', () => {
  let service: IuguBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IuguBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
