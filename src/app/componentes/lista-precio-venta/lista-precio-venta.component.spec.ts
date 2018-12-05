import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrecioVentaComponent } from './lista-precio-venta.component';

describe('ListaPrecioVentaComponent', () => {
  let component: ListaPrecioVentaComponent;
  let fixture: ComponentFixture<ListaPrecioVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPrecioVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrecioVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
