import { TestBed } from '@angular/core/testing';
import { iuguParam } from '../iugu-base/iugu-base.service';

import { NgxIuguService } from './ngx-iugu.service';

const creditCardMock = {
  cardExpirationMonth: '12',
  cardExpirationYear: '33',
  cardNumber: '4111111111111111',
  firstName: 'Peterson',
  fullName: 'Peterson Fonseca',
  securityCode: '123',
  surName: 'Fonseca',
  validate: '12/33',
};

//TODO pesquisar uma forma de criar o token de forma progamativa sem ter que criar hardcodede a variavel global ka
(window as any).ka = {
  ClientSDK: () => {},
  HTTP_POST: 'POST',
  TYPE_UNDEFINED: 'undefined',
  ckendpoint: '/collect/kasupport',
  ckprefix: 'cdn.',
  cksuffix: '.ka.ck',
  host: 'https://kaptcha.iugu.com',
  merchantId: '100164',
  sessionId: 'f3923680409a46cba908ec9a96f17bd3',
};

describe('NgxIuguService', () => {
  let service: NgxIuguService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: iuguParam,
          useValue: {
            accountID: '90F49CDF9E5646BCA03A3B6EAA31049B',
            CDN: 'https://js.iugu.com/v2',
            testMode: true,
          },
        },
      ],
    });
    service = TestBed.inject(NgxIuguService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should create and return a credit card objectwith correct values', async (done) => {
    await service.initialize();
    const creditCard = service.createCreditCardObject(creditCardMock);

    expect(creditCard.brand).toBeTruthy();
    expect(creditCard.errors).toBeTruthy();
    expect(creditCard.toData).toBeTruthy();
    expect(creditCard.valid).toBeTruthy();
    done();
  });

  it('Should create a token when sended credit card object', async (done) => {
    await service.initialize();
    const creditCard = await service.createTokenByObject(creditCardMock);

    expect(creditCard?.id).toBeTruthy();
    expect(creditCard?.test).toBeTruthy();
    expect(creditCard?.errors).toBeFalsy();
    expect(creditCard?.method).toBe('credit_card');
    expect(creditCard?.extra_info?.month).toBe(12);
    expect(creditCard?.extra_info?.year).toBe(2033);
    expect(creditCard?.extra_info?.brand).toBe('VISA');
    expect(creditCard?.extra_info?.bin).toBe('411111');
    expect(creditCard?.extra_info?.display_number).toBe('XXXX-XXXX-XXXX-1111');

    done();
  });
});
