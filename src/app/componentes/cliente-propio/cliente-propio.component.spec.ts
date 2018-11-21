import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePropioComponent } from './cliente-propio.component';

describe('ClientePropioComponent', () => {
  let component: ClientePropioComponent;
  let fixture: ComponentFixture<ClientePropioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientePropioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
