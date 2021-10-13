import { IuguResponse } from '../ngx-iugu/ngx-iugu.models';

export interface Iugu {
  CreditCard: (
    cardNumber: string | number,
    cardExpirationMonth: string | number,
    cardExpirationYear: string | number,
    firstName: string,
    surName: string,
    securityCode: string | number
  ) => CreditCardObjectIugu;
  createPaymentToken: (
    paymentData: any,
    callback: (response: IuguResponse) => any
  ) => any;
  getSessionId: () => any;
  initializedFields: () => any;
  setAccountID: (accountID: string) => any;
  setTestMode: (testMode: boolean) => any;
  setup: () => any;
  utils: {
    formatUUID: () => any;
    getBrandByCreditCardNumber: (cardNumber: string | number) => string;
    getFirstLastNameByFullName: (fullName: string) => string[];
    getMonthYearByFullExpiration: (fullDate: string) => string[];
    keyOf: () => any;
    validateAccountID: (accountID: string) => boolean;
    validateCVV: (securityCode: string, cardFlag: string) => boolean;
    validateCreditCardNumber: (cardNumber: string | number) => boolean;
    validateExpiration: (
      cardExpirationMonth: string | number,
      cardExpirationYear: string | number
    ) => boolean;
    validateExpirationString: (expiration: any) => any;
    validateFirstName: (firstName: string) => boolean;
    validateLastName: (lastName: string) => boolean;
  };
}
export interface CreditCardObjectIugu {
  brand: () => any;
  errors: () => any;
  toData: () => any;
  valid: () => any;
}
