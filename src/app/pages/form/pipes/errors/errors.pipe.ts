import { Pipe, PipeTransform } from '@angular/core';

enum Errors {
  required = 'Campo obrigatório',
  iuguNotInitialized = 'Os scripts da Iugu ainda não foram baixados',
  invalidAccountId = 'AccountID da Iugu  invalido',
  invalidExpiration = 'Data de expiração do cartão é invalido',
  invalidCVV = 'Campo CVV invalido',
  invalidNumber = 'Numero do cartão é invalido',
  mask = 'Campo com valor incorreto',
  withoutCreditCardNumber = 'Para validar o código de seguranca informe o numero do cartão',
}

@Pipe({
  name: 'errors',
})
export class ErrorsPipe implements PipeTransform {
  transform(errors: Errors): string {
    const firstError = Object.keys(errors)[0];
    console.log(errors);
    return Errors[firstError];
  }
}
