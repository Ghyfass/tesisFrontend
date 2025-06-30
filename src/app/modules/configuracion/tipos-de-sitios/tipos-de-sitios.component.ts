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
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { TipoFormDialogComponent } from './tipo-form-dialog/tipo-form-dialog.component';
import { TipoSitioService } from '../services/tipoSitio.service';
import { TipoSitio } from '../../../shared/model/tipoSitio.model';

@Component({
  selector: 'app-tipos-de-sitio',
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
  templateUrl: './tipos-de-sitios.component.html',
  styleUrls: ['./tipos-de-sitios.component.css']
})
export class TiposDeSitioComponent implements OnInit {
  filtro = '';
  dataSource: TipoSitio[] = [];
  displayedColumns = ['id', 'nombre', 'descripcion', 'fechaModificacion', 'ultimousuario', 'estado', 'acciones'];
  usuarioActualId = 'user123';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tipoSitioService: TipoSitioService
  ) {}

  ngOnInit(): void {
    this.cargarTiposSitio();
  }

  cargarTiposSitio() {
    this.tipoSitioService.getAll().subscribe({
      next: (data) => {
        this.dataSource = [...data];
      },
      error: (err) => {
        console.error('Error al cargar tipos de sitio:', err);
        this.snackBar.open('Error al cargar tipos de sitio', 'Cerrar', { duration: 2500 });
      }
    });
  }

  get dataFiltrada() {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      (item.nombre || '').toLowerCase().includes(filtroLower) ||
      (item.descripcion || '').toLowerCase().includes(filtroLower) ||
      (item.ultimousuario || '').toLowerCase().includes(filtroLower)
    );
  }

  crear() {
    const dialogRef = this.dialog.open(TipoFormDialogComponent, {
      width: '500px',
      data: {
        modoCreacion: true,
        tipo: {
          nombre: '',
          descripcion: '',
          estado: true
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.tipoSitioService.create({
            ...result,
            ultimousuario: this.usuarioActualId
          });
          this.snackBar.open('Tipo de sitio creado', 'Cerrar', { duration: 2500 });
          this.cargarTiposSitio(); // Recargar datos
        } catch (error) {
          this.snackBar.open(
            error instanceof Error ? error.message : 'Error al crear tipo de sitio',
            'Cerrar',
            { duration: 2500 }
          );
        }
      }
    });
  }

  editar(item: TipoSitio) {
    const dialogRef = this.dialog.open(TipoFormDialogComponent, {
      width: '500px',
      data: {
        modoCreacion: false,
        tipo: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.tipoSitioService.update({
            ...result,
            id: item.id, // Mantener el ID original
            ultimousuario: this.usuarioActualId
          });
          this.snackBar.open('Tipo de sitio actualizado', 'Cerrar', { duration: 2500 });
          this.cargarTiposSitio(); // Recargar datos
        } catch (error) {
          this.snackBar.open(
            error instanceof Error ? error.message : 'Error al actualizar tipo de sitio',
            'Cerrar',
            { duration: 2500 }
          );
        }
      }
    });
  }

  eliminar(item: TipoSitio) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '350px',
      data: { mensaje: `¿Está seguro de eliminar "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        if (this.tipoSitioService.delete(item.id!)) {
          this.snackBar.open('Tipo de sitio eliminado', 'Cerrar', { duration: 2500 });
          this.cargarTiposSitio();
        } else {
          this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 2500 });
        }
      }
    });
  }

  toggleEstado(item: TipoSitio) {
    if (this.tipoSitioService.toggleEstado(item.id!)) {
      this.snackBar.open(
        `Estado cambiado a ${!item.estado ? 'activo' : 'inactivo'}`,
        'Cerrar',
        { duration: 2500 }
      );
      this.cargarTiposSitio();
    } else {
      this.snackBar.open('Error al cambiar estado', 'Cerrar', { duration: 2500 });
    }
  }
}
