import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import {
  IuguCreditCard,
  IuguResponse,
} from 'projects/ngx-iugu/src/lib/ngx-iugu/ngx-iugu.models';
import { NgxIuguService } from 'projects/ngx-iugu/src/public-api';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'dd-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  creditCardIugu: IuguResponse;
  creditCard!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private IuguService: NgxIuguService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.creditCard = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      validate: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      securityCode: ['', [Validators.required]],
    });

    this.activatedRoute.params.subscribe(async ({ account }) => {
      await this.IuguService.initialize(account);
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
