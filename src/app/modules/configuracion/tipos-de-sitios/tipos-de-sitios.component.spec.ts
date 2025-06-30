import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeSitiosComponent } from './tipos-de-sitios.component';

describe('TiposDeSitiosComponent', () => {
  let component: TiposDeSitiosComponent;
  let fixture: ComponentFixture<TiposDeSitiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposDeSitiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposDeSitiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
