import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglasPorDominioComponent } from './reglas-por-dominio.component';

describe('ReglasPorDominioComponent', () => {
  let component: ReglasPorDominioComponent;
  let fixture: ComponentFixture<ReglasPorDominioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReglasPorDominioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglasPorDominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
