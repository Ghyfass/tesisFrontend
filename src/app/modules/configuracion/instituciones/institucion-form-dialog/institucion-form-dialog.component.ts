import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Institucion } from '../../../../shared/model/institucion.model';

@Component({
  selector: 'app-institucion-form-dialog',
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
  templateUrl: './institucion-form-dialog.component.html',
  styleUrls: ['./institucion-form-dialog.component.css']
})
export class InstitucionFormDialogComponent {
  institucion: Partial<Institucion>;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<InstitucionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      modoCreacion: boolean,
      institucion: Partial<Institucion>
    }
  ) {
    this.modoCreacion = data.modoCreacion;
    this.institucion = { ...data.institucion };
  }

  guardar() {
    if (this.institucion.nombre?.trim() && this.institucion.idOrganismo) {
      this.dialogRef.close({
        ...this.institucion,
        fechaModificacion: new Date() // Asegura fecha actual
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
