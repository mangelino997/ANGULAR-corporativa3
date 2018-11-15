import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubopcionComponent } from './subopcion.component';

describe('SubopcionComponent', () => {
  let component: SubopcionComponent;
  let fixture: ComponentFixture<SubopcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubopcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
