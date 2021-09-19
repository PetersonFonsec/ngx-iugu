import { TestBed } from '@angular/core/testing';
import { iuguParam } from '../iugu-base/iugu-base.service';

import { NgxIuguService } from './ngx-iugu.service';

describe('NgxIuguService', () => {
  let service: NgxIuguService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: iuguParam,
        useValue: {
          accountID: '',
          CDN: 'https://js.iugu.com/v2',
          testMode: true
        }
      }]
    });
    service = TestBed.inject(NgxIuguService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
