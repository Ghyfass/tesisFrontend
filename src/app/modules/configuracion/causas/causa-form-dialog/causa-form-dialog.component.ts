import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Causa } from '../../../../shared/model/causa.model';

@Component({
  selector: 'app-causa-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  templateUrl: './causa-form-dialog.component.html',
  styleUrls: ['./causa-form-dialog.component.css']
})
export class CausaFormDialogComponent {
  causaForm: FormGroup;
  modoCreacion: boolean;

  constructor(
    private dialogRef: MatDialogRef<CausaFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      modoCreacion: boolean,
      causa: Partial<Causa>
    },
    private fb: FormBuilder
  ) {
    this.modoCreacion = data.modoCreacion;

    this.causaForm = this.fb.group({
      titulo: [
        data.causa.titulo || '',
        [Validators.required, Validators.minLength(3)]
      ],
      descripcion: [
        data.causa.descripcion || '',
        [Validators.required, Validators.minLength(10)]
      ],
      estado: [data.causa.estado ?? true]
    });
  }

  guardar() {
    if (this.causaForm.valid) {
      const causaData: Partial<Causa> = {
        ...this.causaForm.value,
        id: this.data.causa.id,
        fechaModificacion: new Date(),
        ultimousuario: 'currentUser' // Reemplazar con usuario real
      };
      this.dialogRef.close(causaData);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  // Helpers para acceso fácil en el template
  get titulo() {
    return this.causaForm.get('titulo');
  }

  get descripcion() {
    return this.causaForm.get('descripcion');
  }
}
