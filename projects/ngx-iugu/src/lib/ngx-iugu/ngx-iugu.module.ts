import { ModuleWithProviders, NgModule } from '@angular/core';
import { iuguCDN, IuguConfig, NgxIuguService } from './ngx-iugu.service';

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
        {
          provide: iuguCDN,
          useValue: config,
        },
      ],
    };
  }
}
