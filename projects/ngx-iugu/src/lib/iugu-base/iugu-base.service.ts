import { Inject, Injectable, InjectionToken } from '@angular/core';
import { IuguConfig } from '../ngx-iugu/ngx-iugu.models';
import { Iugu } from './iugu-base.models';

export const iuguParam = new InjectionToken<IuguConfig>('iuguParam');

@Injectable({
  providedIn: 'root',
})
export class IuguBaseService {
  Iugu: Iugu;

  constructor(@Inject(iuguParam) private iuguConfig?: IuguConfig) {
    if (iuguConfig.autoInicialize) {
      this.initialize().then(() => console.log('iugu script loaded'));
    }
  }

  async initialize(accountID = ''): Promise<void> {
    this.Iugu = await this.loadScript();

    this.Iugu.setAccountID(this.iuguConfig?.accountID || accountID);
    this.Iugu.setTestMode(this.iuguConfig?.testMode ?? true);
  }

  private async loadScript(): Promise<Iugu> {
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.type = 'text/javascript';

    const promise = new Promise<Iugu>((resolve) => {
      script.onload = () => resolve((window as any).Iugu);
    });

    script.src = this.iuguConfig?.CDN ?? 'https://js.iugu.com/v2';
    return promise;
  }
}
