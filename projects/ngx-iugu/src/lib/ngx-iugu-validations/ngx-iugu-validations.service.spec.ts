import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { doesNotReject } from 'assert';
import { iuguParam } from '../iugu-base/iugu-base.service';
import { NgxIuguService } from '../ngx-iugu/ngx-iugu.service';

import { NgxIuguValidationsService } from './ngx-iugu-validations.service';

// TODO pesquisar uma forma de criar o token de forma progamativa sem ter que criar hardcodede a variavel global ka
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

describe('NgxIuguValidationsService', () => {
  let service: NgxIuguValidationsService;
  let iuguService: NgxIuguService;

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

    service = TestBed.inject(NgxIuguValidationsService);
    iuguService = TestBed.inject(NgxIuguService);
    await iuguService.initialize('90F49CDF9E5646BCA03A3B6EAA31049B');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return null when sended a valid credit card number', async (done) => {
    const validCreditCardNumber = new FormControl('4111111111111111');
    const response = await service.asyncValidateCreditCardNumber(
      validCreditCardNumber
    );
    expect(response).toBe(null);
    done();
  });

  it('Should return an object with invalidNumber true when called with invalid credit card number', async (done) => {
    const invalidCreditCardNumber = new FormControl('2222222222222222');
    const response = await service.asyncValidateCreditCardNumber(
      invalidCreditCardNumber
    );
    expect(response).toEqual({ invalidNumber: true });
    done();
  });

  it('Should return null when called with valid accountID', async (done) => {
    const validAccountId = new FormControl('90F49CDF9E5646BCA03A3B6EAA31049B');
    const result = await service.asyncValidateAccountID(validAccountId);
    expect(result).toEqual(null);
    done();
  });

  it('Should return an object with invalidAccountID true when called with invalid accountID', async (done) => {
    const validAccountId = new FormControl('invalidAccountID');
    const result = await service.asyncValidateAccountID(validAccountId);
    expect(result).toEqual({ invalidAccountId: true });
    done();
  });

  it('Should set withoutCreditCardNumber error in cvv control when credit card number is empty or invalid', () => {
    const form = new FormGroup({
      number: new FormControl(0),
      cvv: new FormControl('123'),
    });

    service.validateCVV('number', 'cvv')(form);
    expect(form?.controls?.cvv?.errors?.withoutCreditCardNumber).toBeTruthy();
  });

  it('Should set invalidCVV error in cvv control when cvv is invalid', () => {
    const validCreditCardNumber = '4111111111111111';

    const form = new FormGroup({
      number: new FormControl(validCreditCardNumber),
      cvv: new FormControl('peterson'),
    });

    service.validateCVV('number', 'cvv')(form);
    expect(form?.controls?.cvv?.errors?.invalidCVV).toBeTruthy();
  });

  it('Should return an object with invalidExpiration true when called with invalid date', async (done) => {
    const invalidExpiration = new FormControl('13/1999');
    const result = await service.asyncValidateExpiration(invalidExpiration);
    expect(result).toEqual({ invalidExpiration: true });
    done();
  });

  it('Should return null when called with valid date', async (done) => {
    const validateExpiration = new FormControl('12/2032');
    const result = await service.asyncValidateExpiration(validateExpiration);
    expect(result).toEqual(null);
    done();
  });
});
