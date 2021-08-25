export interface Iugu {
  CreditCard: (
    cardNumber: string | number,
    cardExpirationMonth: string | number,
    cardExpirationYear: string | number,
    firstName: string,
    surName: string,
    securityCode: string | number
  ) => any;
  createPaymentToken: (paymentData: string, callback: (any: any) => any) => any;
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
    validateExpirationString: () => any;
    validateFirstName: (firstName: string) => boolean;
    validateLastName: (lastName: string) => boolean;
  };
}