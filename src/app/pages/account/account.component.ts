import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'dd-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  account = '';
  constructor(private router: Router) {}

  async submit(form: NgForm): Promise<void> {
    if (form.valid) {
      await this.router.navigateByUrl(`/form/${this.account}`);
    }
  }
}
