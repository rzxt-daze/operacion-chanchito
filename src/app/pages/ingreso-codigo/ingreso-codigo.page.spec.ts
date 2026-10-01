import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresoCodigoPage } from './ingreso-codigo.page';

describe('IngresoCodigoPage', () => {
  let component: IngresoCodigoPage;
  let fixture: ComponentFixture<IngresoCodigoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoCodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
