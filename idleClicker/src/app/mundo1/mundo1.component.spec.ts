import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mundo1Component } from './mundo1.component';

describe('Mundo1Component', () => {
  let component: Mundo1Component;
  let fixture: ComponentFixture<Mundo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mundo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mundo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
