import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TematicaFormDialogComponent } from './tematica-form-dialog.component';

describe('TematicaFormDialogComponent', () => {
  let component: TematicaFormDialogComponent;
  let fixture: ComponentFixture<TematicaFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TematicaFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TematicaFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
