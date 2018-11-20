import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteComponent } from './billete.component';

describe('BilleteComponent', () => {
  let component: BilleteComponent;
  let fixture: ComponentFixture<BilleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
