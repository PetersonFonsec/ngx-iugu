import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxIuguService } from './ngx-iugu/ngx-iugu.service';

import { IuguConfig } from './ngx-iugu/ngx-iugu.models';
import { iuguCDN } from './iugu-base/iugu-base.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class NgxIuguModule {
  static footRoot(iuguConfig: IuguConfig): ModuleWithProviders<NgxIuguModule> {
    return {
      ngModule: NgxIuguModule,
      providers: [
        NgxIuguService,
        ,
        {
          provide: iuguCDN,
          useValue: iuguConfig,
        },
      ],
    };
  }
}
