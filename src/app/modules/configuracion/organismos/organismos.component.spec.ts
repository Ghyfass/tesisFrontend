import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismosComponent } from './organismos.component';

describe('OrganismosComponent', () => {
  let component: OrganismosComponent;
  let fixture: ComponentFixture<OrganismosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganismosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
