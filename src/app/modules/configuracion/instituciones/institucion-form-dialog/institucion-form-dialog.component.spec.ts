import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionFormDialogComponent } from './institucion-form-dialog.component';

describe('InstitucionFormDialogComponent', () => {
  let component: InstitucionFormDialogComponent;
  let fixture: ComponentFixture<InstitucionFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitucionFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitucionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
