import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendedorInicioPage } from './vendedor-inicio.page';

describe('VendedorInicioPage', () => {
  let component: VendedorInicioPage;
  let fixture: ComponentFixture<VendedorInicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
