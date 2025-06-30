import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TablaDinamicaComponent } from '../../../shared/tabla-dinamica/tabla-dinamica.component';
import { InstitucionFormDialogComponent } from './institucion-form-dialog/institucion-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { InstitucionService } from '../services/institucion.service';
import { Institucion } from '../../../shared/model/institucion.model';

@Component({
  selector: 'app-instituciones',
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    NgIf,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {
  filtro = '';
  dataSource: Institucion[] = [];
  displayedColumns = ['id', 'nombre', 'idOrganismo', 'descripcion', 'fechaModificacion', 'ultimousuario', 'estado', 'acciones'];
  usuarioActualId = 'user123';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private institucionService: InstitucionService
  ) {}

  ngOnInit(): void {
    this.cargarInstituciones();
  }

  cargarInstituciones(): void {
    this.institucionService.getAll().subscribe({
      next: (data) => {
        this.dataSource = [...data];
      },
      error: (err) => {
        this.mostrarError('Error al cargar instituciones', err);
      }
    });
  }

  get dataFiltrada(): Institucion[] {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      (item.nombre || '').toLowerCase().includes(filtroLower) ||
      (item.descripcion || '').toLowerCase().includes(filtroLower) ||
      (item.ultimousuario || '').toLowerCase().includes(filtroLower)
    );
  }

  crear() {
    const dialogRef = this.dialog.open(InstitucionFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: true,
        institucion: {
          nombre: '',
          idOrganismo: null,
          descripcion: '',
          estado: true
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre.trim() !== '') {
        try {
          this.institucionService.create({
            ...result,
            ultimousuario: this.usuarioActualId
          });
          this.mostrarExito('Institución creada exitosamente');
          this.cargarInstituciones();
        } catch (error) {
          this.mostrarError(
            error instanceof Error ? error.message : 'Error al crear institución',
            error
          );
        }
      }
    });
  }

  editar(item: Institucion) {
    const dialogRef = this.dialog.open(InstitucionFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: false,
        institucion: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.institucionService.update({
            ...result,
            id: item.id,
            ultimousuario: this.usuarioActualId
          });
          this.mostrarExito('Institución actualizada exitosamente');
          this.cargarInstituciones();
        } catch (error) {
          this.mostrarError(
            error instanceof Error ? error.message : 'Error al actualizar institución',
            error
          );
        }
      }
    });
  }

  eliminar(item: Institucion) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '350px',
      data: { mensaje: `¿Está seguro de eliminar "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado && item.id) {
        if (this.institucionService.delete(item.id)) {
          this.mostrarExito('Institución eliminada exitosamente');
          this.cargarInstituciones();
        } else {
          this.mostrarError('Error al eliminar institución', null);
        }
      }
    });
  }

  toggleEstado(item: Institucion) {
    if (item.id && this.institucionService.toggleEstado(item.id)) {
      this.mostrarExito(`Estado cambiado a ${!item.estado ? 'activo' : 'inactivo'}`);
      this.cargarInstituciones();
    } else {
      this.mostrarError('Error al cambiar estado', null);
    }
  }

  private mostrarExito(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 2500 });
  }

  private mostrarError(mensaje: string, error: any): void {
    console.error(mensaje, error);
    this.snackBar.open(mensaje, 'Cerrar', { duration: 2500 });
  }
}
