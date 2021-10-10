
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
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxIuguModule } from 'ngx-iugu';

@NgModule({
  imports: [
    BrowserModule,
    NgxIuguModule.forRoot({
      CDN?: string,
      testMode?: boolean,
      accountID?: string,
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 2. Import the `NgxIuguService`:
```ts
...
import { NgxIuguService, IuguCreditCard, IuguResponse } from 'ngx-iugu';
...

export class MpPaymentPage implements OnInit {
  constructor(
    private IuguService: NgxIuguService
  ) { }
    
  ngOnInit() {
    await this.IuguService.initialize();
  }

  submit() {
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

    try {
      const data = await this.IuguService.createTokenByObject(params);
      this.modal.open(ModalComponent, {
        data,
      });
    } catch (e) {
      const { errors } = e;
      this.snackBar.open(`${Object.keys(errors)[0]} is invalid`, 'Fechar');
      console.log(e);
    }
  }
}
```
## Issues

Please, open an [issue](https://github.com/PetersonFonsec/ngx-iugu/issues) following one of the issues templates. We will do our best to fix them.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/PetersonFonsec/ngx-iugu/blob/master/LICENSE.txt) for more information.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.
