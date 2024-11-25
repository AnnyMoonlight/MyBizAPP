import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompradorProductoPage } from './comprador-producto.page';

describe('CompradorProductoPage', () => {
  let component: CompradorProductoPage;
  let fixture: ComponentFixture<CompradorProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompradorProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
