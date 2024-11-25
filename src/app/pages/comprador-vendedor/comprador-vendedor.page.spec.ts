import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompradorVendedorPage } from './comprador-vendedor.page';

describe('CompradorVendedorPage', () => {
  let component: CompradorVendedorPage;
  let fixture: ComponentFixture<CompradorVendedorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompradorVendedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
