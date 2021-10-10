import { TestBed } from '@angular/core/testing';
import { IuguBaseService, iuguParam } from './iugu-base.service';

describe('IuguBaseService', () => {
  let service: IuguBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: iuguParam,
          useValue: {
            accountID: '',
            CDN: 'https://js.iugu.com/v2',
            testMode: true,
          },
        },
      ],
    });
    service = TestBed.inject(IuguBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should create object global Iugu', (done) => {
    service.initialize().then(() => {
      expect(service.Iugu).toBeTruthy();
      done();
    });
  });

  it('Not should create Iugu object when not calling initilize function', () => {
    expect(service.Iugu).toBeFalsy();
  });
});
