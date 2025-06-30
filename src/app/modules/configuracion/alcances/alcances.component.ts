import { Component, OnInit } from '@angular/core';
import { TablaDinamicaComponent } from '../../../shared/tabla-dinamica/tabla-dinamica.component';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlcanceFormDialogComponent } from './alcance-form-dialog/alcance-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlcanceService } from '../services/alcance.service';
import { Alcance } from '../../../shared/model/alcance.model';

@Component({
  selector: 'app-alcances',
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
    MatSnackBarModule,
  ],
  templateUrl: './alcances.component.html',
  styleUrls: ['./alcances.component.css'],
})
export class AlcancesComponent implements OnInit {
  filtro = '';
  displayedColumns = [
    'id',
    'nombre',
    'fechaModificacion',
    'usuarioModificacion',
    'estado',
    'acciones',
  ];
  dataSource: Alcance[] = [];
  usuarioActualId = 'user999';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private alcanceService: AlcanceService
  ) {}

  ngOnInit(): void {
    this.cargarAlcances();
  }

  cargarAlcances(): void {
    this.alcanceService.getAll().subscribe({
      next: (data) => {
        this.dataSource = [...data];
      },
      error: (err) => {
        this.mostrarError('Error al cargar alcances', err);
      }
    });
  }

  get dataFiltrada(): Alcance[] {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      (item.nombre || '').toLowerCase().includes(filtroLower)
    );
  }

  crear() {
    const dialogRef = this.dialog.open(AlcanceFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: true,
        alcance: {
          nombre: '',
          estado: true
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre.trim() !== '') {
        try {
          this.alcanceService.create({
            ...result,
            usuarioModificacion: this.usuarioActualId
          });
          this.mostrarExito('Alcance creado exitosamente');
          this.cargarAlcances();
        } catch (error) {
          this.mostrarError(
            error instanceof Error ? error.message : 'Error al crear alcance',
            error
          );
        }
      }
    });
  }

  editar(item: Alcance) {
    const dialogRef = this.dialog.open(AlcanceFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: false,
        alcance: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.alcanceService.update({
            ...result,
            id: item.id,
            usuarioModificacion: this.usuarioActualId
          });
          this.mostrarExito('Alcance actualizado exitosamente');
          this.cargarAlcances();
        } catch (error) {
          this.mostrarError(
            error instanceof Error ? error.message : 'Error al actualizar alcance',
            error
          );
        }
      }
    });
  }

  eliminar(item: Alcance) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '350px',
      data: { mensaje: `¿Está seguro de eliminar "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado && item.id) {
        if (this.alcanceService.delete(item.id)) {
          this.mostrarExito('Alcance eliminado exitosamente');
          this.cargarAlcances();
        } else {
          this.mostrarError('Error al eliminar alcance', null);
        }
      }
    });
  }

  toggleEstado(item: Alcance) {
    if (item.id && this.alcanceService.toggleEstado(item.id)) {
      this.mostrarExito(`Estado cambiado a ${!item.estado ? 'activo' : 'inactivo'}`);
      this.cargarAlcances();
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
