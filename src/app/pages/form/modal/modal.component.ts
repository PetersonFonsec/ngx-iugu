import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IuguResponse } from 'projects/ngx-iugu/src/lib/ngx-iugu/ngx-iugu.models';

@Component({
  selector: 'dd-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  creditCardIugu: IuguResponse;
  constructor(@Inject(MAT_DIALOG_DATA) public param: IuguResponse) {}

  ngOnInit(): void {
    this.creditCardIugu = this.param;
  }
}
