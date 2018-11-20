import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalidadPagoComponent } from './modalidad-pago.component';

describe('ModalidadPagoComponent', () => {
  let component: ModalidadPagoComponent;
  let fixture: ComponentFixture<ModalidadPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalidadPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalidadPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
