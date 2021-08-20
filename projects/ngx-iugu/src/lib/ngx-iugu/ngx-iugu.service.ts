import { Injectable } from '@angular/core';
import { IuguBaseService } from '../iugu-base/iugu-base.service';
import { IuguCreditCard, IuguResponse } from './ngx-iugu.models';

@Injectable()
export class NgxIuguService extends IuguBaseService {
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

  private createCreditCardObject({
    cardExpirationMonth,
    cardExpirationYear,
    cardNumber,
    securityCode,
    firstName,
    surName,
  }: IuguCreditCard): void {
    return this.Iugu.CreditCard(
      cardNumber,
      cardExpirationMonth,
      cardExpirationYear,
      firstName,
      surName,
      securityCode
    );
  }

  async createTokenByObject(
    paymentData: IuguCreditCard
  ): Promise<IuguResponse> {
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
