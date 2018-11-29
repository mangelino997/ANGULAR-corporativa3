import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrecioCompraComponent } from './lista-precio-compra.component';

describe('ListaPrecioCompraComponent', () => {
  let component: ListaPrecioCompraComponent;
  let fixture: ComponentFixture<ListaPrecioCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPrecioCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrecioCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
