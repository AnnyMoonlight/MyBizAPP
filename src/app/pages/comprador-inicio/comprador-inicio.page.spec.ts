import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompradorInicioPage } from './comprador-inicio.page';

describe('CompradorInicioPage', () => {
  let component: CompradorInicioPage;
  let fixture: ComponentFixture<CompradorInicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompradorInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
