# ngx-iugu

![NGX-Iugu](https://user-images.githubusercontent.com/41239234/133863967-aeb26e35-9a51-499b-a90c-cdf942d33960.png)

![Lib CI](https://github.com/PetersonFonsec/ngx-iugu/actions/workflows/Lib-CI.yml/badge.svg)
[![npm version](https://badge.fury.io/js/ngx-iugu.svg)](https://badge.fury.io/js/ngx-iugu)<br/>

An Angular wrapper for Iugu gatway for JavaScript.

[Demo](http://ngx-iugu.surge.sh)

[Iugu Docs](https://dev.iugu.com/docs/iugu-js)

## 📲 Installation

First time using Iugu? Create your [Iugu account](https://alia.iugu.com), if you don’t have one already.

First you need to install the npm module:

```
npm i ngx-iugu --save
```

## Usage

#### 1. Import the `NgxIuguModule`:

Finally, you can use ngx-iugu in your Angular project. You have to import `NgxIuguModule.forRoot()` in the root NgModule of your application.

The [`forRoot`](https://angular.io/api/router/RouterModule#forroot) static method is a convention that provides and configures services at the same time.
Make sure you only call this method in the root module of your application, most of the time called `AppModule`.
This method allows you to configure the `NgxIugu` by specifying a publish key and/or a path for JS SDK.

```ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxIuguModule } from "ngx-iugu";

@NgModule({
  imports: [
    BrowserModule,
    NgxIuguModule.forRoot({
      CDN: string,
      testMode: boolean,
      accountID: string,
      autoInicialize: boolean,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### 2. Import the `NgxIuguService` and `NgxIuguValidationsService`

```ts
import {
  NgxIuguService,
  IuguCreditCard,
  IuguResponse,
  NgxIuguValidationsService,
} from "projects/ngx-iugu/src/public-api";

@Component({
  selector: "dd-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  creditCardIugu: IuguResponse;
  creditCard!: FormGroup;

  constructor(
    private IuguValidationsService: NgxIuguValidationsService,
    private IuguService: NgxIuguService,
    private formBuilder: FormBuilder
  ) {}
}
```

#### 3. use the validation function in your form

```ts
export class FormComponent implements OnInit {
  //[...Code ...]/
  async ngOnInit(): Promise<void> {
    this.creditCard = this.formBuilder.group(
      {
        fullName: ["", [Validators.required]],
        validate: [
          "",
          [Validators.required],
          [this.IuguValidationsService.asyncValidateExpiration],
        ],
        cardNumber: [
          "",
          [Validators.required],
          [this.IuguValidationsService.asyncValidateCreditCardNumber],
        ],
        securityCode: ["", [Validators.required]],
      },
      {
        validator: this.IuguValidationsService.validateCVV(
          "cardNumber",
          "securityCode"
        ),
      }
    );
  }
  //[...Code ...]/
}
```

#### Validations functions for reactive forms

A classe `NgxIuguValidationsService` nos fornece uma abstração das funções disponibilizadas pela Iugu, com funções que
podem ser usadas para validação dos campos de um formulário reativo.

##### Functions for validations

All validation functions add an error to the control of the example form
`form.controls[securityCode].setErrors({ invalidCVV: true });`

| Functions                     | Error name                           | Description                                                                                                                                                             |
| ----------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| asyncValidateCreditCardNumber | invalidNumber                        | Adds an error to control when network credit card number is invalid                                                                                                     |
| asyncValidateAccountID        | invalidAccountId                     | Adds error when accountId is invalid                                                                                                                                    |
| validateCVV                   | withoutCreditCardNumber / invalidCVV | The cvv field its validation depends also on the credit card number, so we have 2 possible errors when the cvv is invalid or when the credit card number was not filled |
| asyncValidateExpiration       | invalidExpiration                    | validates the card expiration field an observation is that the field used in this function must contain the month and year, example `12/33` or `12/2033`                |

The validateCVV function recebe dois parametros sendo eles o nome do control usados para o numero do cartão de credito e para o cvv repectivamentes

#### 4. Make your token Iugu

```ts
export class FormComponent implements OnInit {
  //[...Code ...]/
  async submit(): Promise<void> {
    const creditCard = this.creditCard.getRawValue();
    const [firstName, surName] =
      this.IuguService.Iugu.utils.getFirstLastNameByFullName(
        creditCard.fullName
      );
    const [cardExpirationMonth, cardExpirationYear] =
      this.IuguService.Iugu.utils.getMonthYearByFullExpiration(
        creditCard.validate
      );

    const params: IuguCreditCard = {
      ...creditCard,
      cardExpirationMonth,
      cardExpirationYear,
      firstName,
      surName,
    };

    const data = await this.IuguService.createTokenByObject(params);
  }
}
```

## Issues

Please, open an [issue](https://github.com/PetersonFonsec/ngx-iugu/issues) following one of the issues templates. We will do our best to fix them.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/PetersonFonsec/ngx-iugu/blob/master/LICENSE.txt) for more information.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.
