import { Inject, Injectable, InjectionToken } from '@angular/core';
import { IuguConfig } from '../ngx-iugu/ngx-iugu.models';
import { Iugu } from './iugu-base.models';

/** @hidden */
export const iuguParam = new InjectionToken<string>('iuguParam');

export class IuguBaseService {
  Iugu: Iugu;

  constructor(@Inject(iuguParam) private iuguParam?: IuguConfig) {}

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
