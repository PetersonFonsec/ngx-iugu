import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxMaskModule } from 'ngx-mask';
import { NgxIuguModule } from 'ngx-iugu';

import { FormComponent } from './form.component';
import { environment } from 'src/environments/environment';
import { FormRoutingModule } from './form-routing.module';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [FormComponent, ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    FormRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    NgxIuguModule.footRoot({
      testMode: !environment.production,
    }),
  ],
  exports: [FormComponent],
})
export class FormModule {}
