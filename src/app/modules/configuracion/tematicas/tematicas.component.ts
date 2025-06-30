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
import { TematicaFormDialogComponent } from './tematica-form-dialog/tematica-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { TematicaService } from '../services/tematica.service';
import { Tematica } from '../../../shared/model/tematica.model';

@Component({
  selector: 'app-tematicas',
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
  templateUrl: './tematicas.component.html',
  styleUrls: ['./tematicas.component.css']
})
export class TematicasComponent implements OnInit {
  filtro = '';
  dataSource: Tematica[] = [];
  displayedColumns = ['id', 'nombre', 'descripcion', 'fechaModificacion', 'ultimousuario', 'estado', 'acciones'];
  usuarioActualId = 'user123';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tematicaService: TematicaService
  ) {}

  ngOnInit(): void {
    this.cargarTematicas();
  }

  cargarTematicas(): void {
    this.tematicaService.getAll().subscribe({
      next: (data) => {
        this.dataSource = [...data];
      },
      error: (err) => {
        this.mostrarError('Error al cargar temáticas', err);
      }
    });
  }

  get dataFiltrada(): Tematica[] {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      (item.nombre || '').toLowerCase().includes(filtroLower) ||
      (item.descripcion || '').toLowerCase().includes(filtroLower) ||
      (item.ultimousuario || '').toLowerCase().includes(filtroLower)
    );
  }

  crear() {
    const dialogRef = this.dialog.open(TematicaFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: true,
        tematica: {
          nombre: '',
          descripcion: '',
          estado: true
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre.trim() !== '') {
        try {
          this.tematicaService.create({
            ...result,
            ultimousuario: this.usuarioActualId
          });
          this.mostrarExito('Temática creada exitosamente');
          this.cargarTematicas();
        } catch (error) {
          this.mostrarError(
            error instanceof Error ? error.message : 'Error al crear temática',
            error
          );
        }
      }
    });
  }

  editar(item: Tematica) {
    const dialogRef = this.dialog.open(TematicaFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: false,
        tematica: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.tematicaService.update({
            ...result,
            id: item.id,
            ultimousuario: this.usuarioActualId
          });
          this.mostrarExito('Temática actualizada exitosamente');
          this.cargarTematicas();
        } catch (error) {
          this.mostrarError(
            error instanceof Error ? error.message : 'Error al actualizar temática',
            error
          );
        }
      }
    });
  }

  eliminar(item: Tematica) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '350px',
      data: { mensaje: `¿Está seguro de eliminar "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado && item.id) {
        if (this.tematicaService.delete(item.id)) {
          this.mostrarExito('Temática eliminada exitosamente');
          this.cargarTematicas();
        } else {
          this.mostrarError('Error al eliminar temática', null);
        }
      }
    });
  }

  toggleEstado(item: Tematica) {
    if (item.id && this.tematicaService.toggleEstado(item.id)) {
      this.mostrarExito(`Estado cambiado a ${!item.estado ? 'activo' : 'inactivo'}`);
      this.cargarTematicas();
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
