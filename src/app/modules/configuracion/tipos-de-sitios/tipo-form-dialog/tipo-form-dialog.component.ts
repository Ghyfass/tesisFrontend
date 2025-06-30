import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { TipoSitio } from '../../../../shared/model/tipoSitio.model';

@Component({
  selector: 'app-tipo-form-dialog',
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
  templateUrl: './tipo-form-dialog.component.html',
  styleUrls: ['./tipo-form-dialog.component.css']
})
export class TipoFormDialogComponent {
  tipo: Partial<TipoSitio>;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<TipoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      modoCreacion: boolean,
      tipo: Partial<TipoSitio>
    }
  ) {
    this.modoCreacion = data.modoCreacion;
    this.tipo = {
      ...data.tipo,
      estado: data.tipo.estado !== false // Default true
    };
  }

  guardar() {
    if (this.tipo.nombre?.trim()) {
      this.dialogRef.close(this.tipo);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
