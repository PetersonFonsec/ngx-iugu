import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Iugu, IuguCreditCard, IuguResponse } from './ngx-iugu.models';

export interface IuguConfig {
  accountID: string;
  CDN: string;
  testMode: boolean;
}

export const iuguCDN = new InjectionToken<string>('interval');

@Injectable({
  providedIn: 'root',
})
export class NgxIuguService {
  private Iugu: Iugu;

  constructor(@Inject(iuguCDN) private iuguParam: IuguConfig) {
    this.initialize();
  }

  private async loadScript(): Promise<Iugu> {
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.type = 'text/javascript';

    const promise = new Promise<Iugu>((resolve) => {
      script.onload = function () {
        resolve((window as any).Iugu);
      };
    });

    script.src = this.iuguParam.CDN;
    return promise;
  }

  private async initialize() {
    this.Iugu = await this.loadScript();
    console.log(this.Iugu);

    this.Iugu.setAccountID(this.iuguParam.accountID);
    this.Iugu.setTestMode(this.iuguParam.testMode);
  }

  private error(fieldName = '', message = '') {
    return {
      fields: [
        {
          fieldName,
          message,
        },
      ],
      message: 'Desculpe, ocorreu um erro na validação dos dados informados.',
    };
  }

  createCreditCardObject({
    cardExpirationMonth,
    cardExpirationYear,
    cardNumber,
    securityCode,
    firstName,
    surName,
  }: IuguCreditCard): void {
    this.validCreditCard(
      cardExpirationMonth,
      cardExpirationYear,
      cardNumber,
      securityCode
    );

    return this.Iugu.CreditCard(
      cardNumber,
      cardExpirationMonth,
      cardExpirationYear,
      firstName,
      surName,
      securityCode
    );
  }

  private validCreditCard(
    cardExpirationMonth: any,
    cardExpirationYear: any,
    cardNumber: any,
    securityCode: any
  ): void {
    const utils = this.Iugu.utils;
    const cardFlag = utils.getBrandByCreditCardNumber(cardNumber);

    if (!utils.validateCreditCardNumber(cardNumber))
      throw this.error('cardNumber', 'Número do cartão é inválido');
    if (!utils.validateExpiration(cardExpirationMonth, cardExpirationYear))
      throw this.error('valid', 'Data de validade do cartão está inválido');
    if (!utils.validateCVV(securityCode, cardFlag))
      throw this.error('securityCode', 'Número do CVV é inválido');
  }

  async createTokenByObject(paymentData: any): Promise<IuguResponse> {
    const creditCardObject = this.createCreditCardObject(paymentData);
    return await this.createToken(creditCardObject);
  }

  createToken(paymentData: any): Promise<IuguResponse> {
    return new Promise((resolve, reject) => {
      this.Iugu.createPaymentToken(paymentData, function (response: any) {
        response.errors ? reject(response) : resolve(response);
      });
    });
  }
}
