export interface IuguCreditCard {
  cardExpirationMonth: string | number;
  cardExpirationYear: string | number;
  cardNumber: string | number;
  securityCode: string | number;
  firstName: string | number;
  surName: string | number;
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
