import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Provincia } from '../../../../shared/model/provincia.model';

@Component({
  selector: 'app-provincia-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './provincia-form-dialog.component.html',
  styleUrls: ['./provincia-form-dialog.component.css']
})
export class ProvinciaFormDialogComponent {
  provincia: Partial<Provincia>;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<ProvinciaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      modoCreacion: boolean,
      provincia: Partial<Provincia>
    }
  ) {
    this.modoCreacion = data.modoCreacion;
    this.provincia = { ...data.provincia };
  }

  guardar() {
    if (this.provincia.nombre?.trim() && this.provincia.codigo?.trim()) {
      this.dialogRef.close(this.provincia);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
