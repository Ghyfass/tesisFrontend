import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoFormDialogComponent } from './tipo-form-dialog.component';

describe('TipoFormDialogComponent', () => {
  let component: TipoFormDialogComponent;
  let fixture: ComponentFixture<TipoFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
