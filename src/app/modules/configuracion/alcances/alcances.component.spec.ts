import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcancesComponent } from './alcances.component';

describe('AlcancesComponent', () => {
  let component: AlcancesComponent;
  let fixture: ComponentFixture<AlcancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlcancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlcancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
