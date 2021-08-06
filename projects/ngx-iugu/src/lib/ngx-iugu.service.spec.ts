import { TestBed } from '@angular/core/testing';

import { NgxIuguService } from './ngx-iugu.service';

describe('NgxIuguService', () => {
  let service: NgxIuguService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxIuguService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
