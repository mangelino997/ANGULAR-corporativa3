import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaReporteComponent } from './venta-reporte.component';

describe('VentaReporteComponent', () => {
  let component: VentaReporteComponent;
  let fixture: ComponentFixture<VentaReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
