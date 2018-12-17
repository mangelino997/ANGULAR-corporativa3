import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraReporteComponent } from './compra-reporte.component';

describe('CompraReporteComponent', () => {
  let component: CompraReporteComponent;
  let fixture: ComponentFixture<CompraReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
