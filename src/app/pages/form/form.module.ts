import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxMaskModule } from 'ngx-mask';
import { NgxIuguModule } from 'projects/ngx-iugu/src/public-api';

import { FormComponent } from './form.component';
import { environment } from 'src/environments/environment';
import { FormRoutingModule } from './form-routing.module';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorsPipe } from './pipes/errors/errors.pipe';

@NgModule({
  declarations: [FormComponent, ModalComponent, ErrorsPipe],
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
    NgxMaskModule.forRoot({
      validation: true,
    }),
    NgxIuguModule.footRoot({
      testMode: !environment.production,
    }),
  ],
  exports: [FormComponent],
})
export class FormModule {}
