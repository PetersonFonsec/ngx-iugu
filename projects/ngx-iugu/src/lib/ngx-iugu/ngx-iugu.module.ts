import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxIuguUtilsService } from '../ngx-iugu-utils/ngx-iugu-utils.service';
import { NgxIuguService } from './ngx-iugu.service';

import { IuguConfig } from '../ngx-iugu/ngx-iugu.models';
import { iuguCDN } from '../iugu-base/iugu-base.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class NgxIuguModule {
  static footRoot(config: IuguConfig): ModuleWithProviders<NgxIuguModule> {
    return {
      ngModule: NgxIuguModule,
      providers: [
        NgxIuguService,
        NgxIuguUtilsService,
        {
          provide: iuguCDN,
          useValue: config,
        },
      ],
    };
  }
}
