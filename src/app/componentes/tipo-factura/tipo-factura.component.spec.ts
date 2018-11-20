import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoFacturaComponent } from './tipo-factura.component';

describe('TipoFacturaComponent', () => {
  let component: TipoFacturaComponent;
  let fixture: ComponentFixture<TipoFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
