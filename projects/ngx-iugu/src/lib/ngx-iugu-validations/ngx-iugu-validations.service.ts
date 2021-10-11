import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    return new Promise((resolver) => {
      try {
        const iugu = this.getIugu();
        const isValidNumber = iugu.utils.validateCreditCardNumber(
          control.value
        );
        resolver(isValidNumber ? null : { invalidNumber: true });
      } catch (error) {
        return resolver({ iuguNotInitialized: true });
      }
    });
  };

  validateCreditCardNumber = (field: FormControl) => {
    try {
      const iugu = this.getIugu();
      const isValidNumber = iugu.utils.validateCreditCardNumber(field.value);
      if (!isValidNumber) return { invalidNumber: true };
    } catch (error) {
      return { iuguNotInitialized: true };
    }
  };

  asyncValidateAccountID = (field: FormControl) => {
    return new Promise((resolver) => {
      try {
        const iugu = this.getIugu();
        const isValidAccountID = iugu.utils.validateAccountID(field.value);
        !isValidAccountID ? resolver({ invalidNumber: true }) : resolver(null);
      } catch (error) {
        return { iuguNotInitialized: true };
      }
    });
  };

  validateAccountID = (field: FormControl) => {
    try {
      const iugu = this.getIugu();
      const isValidAccountID = iugu.utils.validateAccountID(field.value);
      if (!isValidAccountID) return { invalidAccountID: true };
    } catch (error) {
      return { iuguNotInitialized: true };
    }
  };

  asyncValidateCVV = (field: FormControl) => {
    return new Promise((resolver) => {
      try {
        const { value } = field;
        const iugu = this.getIugu();
        const flag = iugu.utils.getBrandByCreditCardNumber(value);
        const isValidCVV = iugu.utils.validateCVV(value, flag);
        !isValidCVV ? resolver({ invalidCVV: true }) : resolver(null);
      } catch (error) {
        console.log(error);
        return { iuguNotInitialized: true };
      }
    });
  };

  validateCVV = (field: FormControl) => {
    try {
      const { value } = field;
      const iugu = this.getIugu();
      const flag = iugu.utils.getBrandByCreditCardNumber(value);
      const isValidCVV = iugu.utils.validateCVV(value, flag);
      if (!isValidCVV) return { invalidCVV: true };
    } catch (error) {
      return { iuguNotInitialized: true };
    }
  };

  asyncValidateExpiration = (field: FormControl) => {
    return new Promise((resolver) => {
      try {
        const { value } = field;
        const iugu = this.getIugu();
        const [cardExpirationMonth, cardExpirationYear] =
          iugu.utils.getMonthYearByFullExpiration(value);
        const isValidExpiration = iugu.utils.validateExpiration(
          cardExpirationMonth,
          cardExpirationYear
        );
        !isValidExpiration ? resolver({ invalidNumber: true }) : resolver(null);
      } catch (error) {
        return { iuguNotInitialized: true };
      }
    });
  };

  validateExpiration = (field: FormControl) => {
    try {
      const { value } = field;
      const iugu = this.getIugu();
      const [cardExpirationMonth, cardExpirationYear] =
        iugu.utils.getMonthYearByFullExpiration(value);
      const isValidExpiration = iugu.utils.validateExpiration(
        cardExpirationMonth,
        cardExpirationYear
      );
      if (!isValidExpiration) return { invalidNumber: true };
    } catch (error) {
      return { iuguNotInitialized: true };
    }
  };

  asyncValidateExpirationString = (field: FormControl) => {
    return new Promise((resolver) => {
      try {
        const { value } = field;
        const iugu = this.getIugu();
        const isValidExpiration = iugu.utils.validateExpirationString(value);

        !isValidExpiration ? resolver({ invalidNumber: true }) : resolver(null);
      } catch (error) {
        return { iuguNotInitialized: true };
      }
    });
  };

  validateExpirationString = (field: FormControl) => {
    try {
      const { value } = field;
      const iugu = this.getIugu();
      const isValidExpiration = iugu.utils.validateExpirationString(value);
      if (!isValidExpiration) return { invalidNumber: true };
    } catch (error) {
      return { iuguNotInitialized: true };
    }
  };
}
