import { Component } from '@angular/core';
import { NgxIuguService } from 'projects/ngx-iugu/src/public-api';

@Component({
  selector: 'dd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dd-iugu';

  constructor(private IuguService: NgxIuguService) {}
}
