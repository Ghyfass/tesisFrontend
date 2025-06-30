import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Alcance } from '../../../../shared/model/alcance.model';

@Component({
  selector: 'app-alcance-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  templateUrl: './alcance-form-dialog.component.html',
  styleUrls: ['./alcance-form-dialog.component.css']
})
export class AlcanceFormDialogComponent {
  alcance: Partial<Alcance>;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<AlcanceFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      modoCreacion: boolean,
      alcance: Partial<Alcance>
    }
  ) {
    this.modoCreacion = data.modoCreacion;
    this.alcance = {
      ...data.alcance,
      estado: data.alcance.estado !== false // Default true
    };
  }

  guardar() {
    if (this.alcance.nombre?.trim()) {
      this.dialogRef.close({
        ...this.alcance,
        nombre: this.alcance.nombre.trim()
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
