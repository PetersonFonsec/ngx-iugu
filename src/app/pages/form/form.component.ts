import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IuguCreditCard } from 'projects/ngx-iugu/src/lib/ngx-iugu/ngx-iugu.models';
import { NgxIuguService } from 'projects/ngx-iugu/src/public-api';

@Component({
  selector: 'dd-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  creditCard!: FormGroup;
  token = '';

  constructor(
    private IuguService: NgxIuguService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ account }) => {
      this.initialize(account);
    });
  }

  async initialize(account: string): Promise<void> {
    this.creditCard = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      validate: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      securityCode: ['', [Validators.required]],
    });
  }

  async submit() {
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
      this.token = (await this.IuguService.createTokenByObject(params))?.id;
    } catch (e) {
      console.log(e);
    }
  }
}
