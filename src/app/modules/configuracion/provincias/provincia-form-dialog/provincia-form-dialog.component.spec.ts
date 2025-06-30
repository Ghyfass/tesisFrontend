import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaFormDialogComponent } from './provincia-form-dialog.component';

describe('ProvinciaFormDialogComponent', () => {
  let component: ProvinciaFormDialogComponent;
  let fixture: ComponentFixture<ProvinciaFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvinciaFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinciaFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
