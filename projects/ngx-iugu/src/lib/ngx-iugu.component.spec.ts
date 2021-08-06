import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxIuguComponent } from './ngx-iugu.component';

describe('NgxIuguComponent', () => {
  let component: NgxIuguComponent;
  let fixture: ComponentFixture<NgxIuguComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxIuguComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxIuguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
