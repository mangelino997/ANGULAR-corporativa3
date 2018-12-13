import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockFormularioComponent } from './stock-formulario.component';

describe('StockFormularioComponent', () => {
  let component: StockFormularioComponent;
  let fixture: ComponentFixture<StockFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
