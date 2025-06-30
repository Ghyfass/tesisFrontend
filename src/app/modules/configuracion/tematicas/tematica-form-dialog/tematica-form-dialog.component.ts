import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Tematica } from '../../../../shared/model/tematica.model';

@Component({
  selector: 'app-tematica-form-dialog',
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
  templateUrl: './tematica-form-dialog.component.html',
  styleUrls: ['./tematica-form-dialog.component.css']
})
export class TematicaFormDialogComponent {
  tematica: Partial<Tematica>;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<TematicaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      modoCreacion: boolean,
      tematica: Partial<Tematica>
    }
  ) {
    this.modoCreacion = data.modoCreacion;
    this.tematica = {
      ...data.tematica,
      estado: data.tematica.estado !== false // Default true
    };
  }

  guardar() {
    if (this.tematica.nombre?.trim()) {
      this.dialogRef.close({
        ...this.tematica,
        nombre: this.tematica.nombre.trim(),
        descripcion: this.tematica.descripcion?.trim() || ''
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
