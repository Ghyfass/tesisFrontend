import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CausaFormDialogComponent } from './causa-form-dialog.component';

describe('CausaFormDialogComponent', () => {
  let component: CausaFormDialogComponent;
  let fixture: ComponentFixture<CausaFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CausaFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CausaFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
