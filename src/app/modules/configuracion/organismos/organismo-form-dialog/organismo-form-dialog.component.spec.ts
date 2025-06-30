import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismoFormDialogComponent } from './organismo-form-dialog.component';

describe('OrganismoFormDialogComponent', () => {
  let component: OrganismoFormDialogComponent;
  let fixture: ComponentFixture<OrganismoFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganismoFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
