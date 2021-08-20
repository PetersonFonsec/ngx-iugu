import { Inject, Injectable, InjectionToken } from '@angular/core';
import { IuguConfig } from '../ngx-iugu/ngx-iugu.models';
import { Iugu } from './iugu-base.models';

export const iuguCDN = new InjectionToken<string>('interval');

@Injectable()
export class IuguBaseService {
  Iugu: Iugu;

  constructor(@Inject(iuguCDN) private iuguParam?: IuguConfig) {
    this.initialize();
  }

  async initialize(accountID = '') {
    this.Iugu = await this.loadScript();

    this.Iugu.setAccountID(this.iuguParam?.accountID || accountID);
    this.Iugu.setTestMode(this.iuguParam?.testMode ?? true);
  }

  private async loadScript(): Promise<Iugu> {
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.type = 'text/javascript';

    const promise = new Promise<Iugu>((resolve) => {
      script.onload = function () {
        resolve((window as any).Iugu);
      };
    });

    script.src = this.iuguParam?.CDN ?? 'https://js.iugu.com/v2';
    return promise;
  }
}
