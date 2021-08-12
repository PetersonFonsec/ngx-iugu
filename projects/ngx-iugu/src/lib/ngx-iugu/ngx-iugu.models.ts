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
    getFirstLastNameByFullName: () => any;
    getMonthYearByFullExpiration: () => any;
    keyOf: () => any;
    validateAccountID: () => any;
    validateCVV: (securityCode: string, cardFlag: string) => boolean;
    validateCreditCardNumber: (cardNumber: string | number) => boolean;
    validateExpiration: (
      cardExpirationMonth: string | number,
      cardExpirationYear: string | number
    ) => boolean;
    validateExpirationString: () => any;
    validateFirstName: () => any;
    validateLastName: () => any;
  };
}

export interface IuguCreditCard {
  cardExpirationMonth: string | number;
  cardExpirationYear: string | number;
  cardNumber: string | number;
  securityCode: string | number;
  firstName: string;
  surName: string;
}

export interface IuguResponse {
  extra_info: {
    bin: string;
    brand: string;
    display_number: string;
    holder_name: string;
    month: number;
    year: number;
  };
  id: string;
  method: string;
  test: boolean;
  errors?: {
    expiration?: string;
    number?: string;
    verification_value?: string;
    first_name?: string;
    last_name?: string;
  };
}
