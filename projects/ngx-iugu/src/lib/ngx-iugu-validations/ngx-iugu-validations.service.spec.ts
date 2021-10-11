import { TestBed } from '@angular/core/testing';

import { NgxIuguValidationsService } from './ngx-iugu-validations.service';

describe('NgxIuguValidationsService', () => {
  let service: NgxIuguValidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxIuguValidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
