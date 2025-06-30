import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglaFormDialogComponent } from './regla-form-dialog.component';

describe('ReglaFormDialogComponent', () => {
  let component: ReglaFormDialogComponent;
  let fixture: ComponentFixture<ReglaFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReglaFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReglaFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
