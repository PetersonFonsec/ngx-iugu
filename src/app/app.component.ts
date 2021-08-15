import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxIuguService } from 'projects/ngx-iugu/src/public-api';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dd-iugu';
  creditCard!: FormGroup;

  constructor(
    private IuguService: NgxIuguService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.creditCard = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      validate: ['', Validators.required],
      security: ['', Validators.required],
    });
  }

  submit() {
    const creditCard = this.creditCard.getRawValue();
  }
}
