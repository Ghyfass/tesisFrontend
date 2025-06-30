import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcanceFormDialogComponent } from './alcance-form-dialog.component';

describe('AlcanceFormDialogComponent', () => {
  let component: AlcanceFormDialogComponent;
  let fixture: ComponentFixture<AlcanceFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlcanceFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlcanceFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
