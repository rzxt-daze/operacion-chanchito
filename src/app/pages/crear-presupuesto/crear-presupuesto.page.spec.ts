import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPresupuestoPage } from './crear-presupuesto.page';

describe('CrearPresupuestoPage', () => {
  let component: CrearPresupuestoPage;
  let fixture: ComponentFixture<CrearPresupuestoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPresupuestoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
