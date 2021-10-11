import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Iugu } from '../iugu-base/iugu-base.models';

@Injectable({
  providedIn: 'root',
})
export class NgxIuguValidationsService {
  constructor() {}

  private getIugu(): Iugu {
    const iugu: Iugu | undefined = (window as any).Iugu;
    if (!iugu) throw new Error('iugu scripts not yet initialized');
    return iugu;
  }

  asyncValidateCreditCardNumber = (control: FormControl) => {
    return new Promise((resolver, reject) => {
      try {
        const iugu = this.getIugu();
        const isValidNumber = iugu.utils.validateCreditCardNumber(
          control.value
        );
        resolver(isValidNumber ? null : { invalidNumber: true });
      } catch (error) {
        return reject({ iuguNotInitialized: true });
      }
    });
  };

  asyncValidateAccountID = (field: FormControl) => {
    return new Promise((resolver, reject) => {
      try {
        const regex =
          /^[a-fA-F0-9]{8}[a-fA-F0-9]{4}[a-fA-F0-9]{4}[a-fA-F0-9]{4}[a-fA-F0-9]{12}$/;
        const isValidAccountID = regex.test(field.value);
        resolver(isValidAccountID ? null : { invalidAccountId: true });
      } catch (error) {
        return reject({ iuguNotInitialized: true });
      }
    });
  };

  validateCVV(creditCardNumber: string, securityCode: string) {
    return (form: FormGroup) => {
      try {
        const cvv = form.controls[securityCode]?.value;
        const ccNumber = form.controls[creditCardNumber]?.value;
        const iugu = this.getIugu();
        const flag = iugu.utils.getBrandByCreditCardNumber(
          ccNumber?.toString()
        );

        if (!flag || !ccNumber) {
          return form.controls[securityCode].setErrors({
            withoutCreditCardNumber: true,
          });
        }

        const isValidCVV = iugu.utils.validateCVV(cvv, flag);

        if (!isValidCVV) {
          form.controls[securityCode].setErrors({ invalidCVV: true });
        }

        return isValidCVV ? null : { invalidCVV: true };
      } catch (error) {
        return { iuguNotInitialized: true };
      }
    };
  }

  asyncValidateExpiration = (field: FormControl) => {
    return new Promise((resolver, reject) => {
      try {
        const { value } = field;
        const iugu = this.getIugu();
        const [cardExpirationMonth, cardExpirationYear] =
          iugu.utils.getMonthYearByFullExpiration(value);
        const isValidExpiration = iugu.utils.validateExpiration(
          cardExpirationMonth,
          cardExpirationYear
        );

        resolver(isValidExpiration ? null : { invalidExpiration: true });
      } catch (error) {
        return reject({ iuguNotInitialized: true });
      }
    });
  };
}
