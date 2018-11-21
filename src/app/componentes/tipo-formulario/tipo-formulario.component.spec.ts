import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoFormularioComponent } from './tipo-formulario.component';

describe('TipoFormularioComponent', () => {
  let component: TipoFormularioComponent;
  let fixture: ComponentFixture<TipoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
