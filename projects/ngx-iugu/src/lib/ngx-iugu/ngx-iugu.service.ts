import { Injectable } from '@angular/core';
import { CreditCardObjectIugu } from '../iugu-base/iugu-base.models';
import { IuguBaseService } from '../iugu-base/iugu-base.service';
import { IuguCreditCard, IuguResponse } from './ngx-iugu.models';
@Injectable({
  providedIn: 'root',
})
export class NgxIuguService extends IuguBaseService {
  createCreditCardObject({
    cardExpirationMonth,
    cardExpirationYear,
    cardNumber,
    securityCode,
    firstName,
    surName,
  }: IuguCreditCard): CreditCardObjectIugu {
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

  createToken(paymentData: CreditCardObjectIugu): Promise<IuguResponse> {
    return new Promise((resolve, reject) => {
      this.Iugu.createPaymentToken(paymentData, (response: IuguResponse) =>
        response.errors ? reject(response) : resolve(response)
      );
    });
  }
}
