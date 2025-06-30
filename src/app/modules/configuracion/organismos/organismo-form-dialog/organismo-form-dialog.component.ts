import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Organismo } from '../../../../shared/model/organismo.model';

@Component({
  selector: 'app-organismo-form-dialog',
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
  templateUrl: './organismo-form-dialog.component.html',
  styleUrls: ['./organismo-form-dialog.component.css']
})
export class OrganismoFormDialogComponent {
  organismo: Partial<Organismo>;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<OrganismoFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      modoCreacion: boolean,
      organismo: Partial<Organismo>
    }
  ) {
    this.modoCreacion = data.modoCreacion;
    this.organismo = {
      ...data.organismo,
      estado: data.organismo.estado !== false // Default true
    };
  }

  guardar() {
    if (this.organismo.nombre?.trim()) {
      this.dialogRef.close({
        ...this.organismo,
        nombre: this.organismo.nombre.trim(),
        descripcion: this.organismo.descripcion?.trim() || ''
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
