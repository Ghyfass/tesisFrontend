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
import { ProvinciaFormDialogComponent } from './provincia-form-dialog/provincia-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { ProvinciaService } from '../services/provincia.service';
import { Provincia } from '../../../shared/model/provincia.model';

@Component({
  selector: 'app-provincias',
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
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent implements OnInit {
  filtro = '';
  dataSource: Provincia[] = [];
  displayedColumns = ['id', 'nombre', 'codigo', 'ultimousuario', 'fechaModificacion', 'estado', 'acciones'];
  usuarioActualId = 'user123';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private provinciaService: ProvinciaService
  ) {}

  ngOnInit(): void {
    this.cargarProvincias();
  }

  cargarProvincias() {
    this.provinciaService.getAll().subscribe({
      next: (data) => {
        this.dataSource = [...data];
      },
      error: (err) => {
        console.error('Error al cargar provincias:', err);
        this.snackBar.open('Error al cargar provincias', 'Cerrar', { duration: 2500 });
      }
    });
  }

  get dataFiltrada() {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      item.nombre.toLowerCase().includes(filtroLower) ||
      item.ultimousuario.toLowerCase().includes(filtroLower) ||
      item.codigo.toLowerCase().includes(filtroLower)
    );
  }

  crear() {
    const dialogRef = this.dialog.open(ProvinciaFormDialogComponent, {
      width: '500px',
      data: {
        modoCreacion: true,
        provincia: {
          nombre: '',
          codigo: '',
          estado: true
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre.trim() !== '' && result.codigo.trim() !== '') {
        try {
          this.provinciaService.create({
            ...result,
            ultimousuario: this.usuarioActualId
          });
          this.snackBar.open('Provincia creada', 'Cerrar', { duration: 2500 });
          this.cargarProvincias();
        } catch (error) {
          this.snackBar.open(
            error instanceof Error ? error.message : 'Error al crear provincia',
            'Cerrar',
            { duration: 2500 }
          );
        }
      }
    });
  }

  editar(item: Provincia) {
    const dialogRef = this.dialog.open(ProvinciaFormDialogComponent, {
      width: '500px',
      data: {
        modoCreacion: false,
        provincia: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.provinciaService.update({
            ...result,
            id: item.id,
            ultimousuario: this.usuarioActualId
          });
          this.snackBar.open('Provincia actualizada', 'Cerrar', { duration: 2500 });
          this.cargarProvincias();
        } catch (error) {
          this.snackBar.open(
            error instanceof Error ? error.message : 'Error al actualizar provincia',
            'Cerrar',
            { duration: 2500 }
          );
        }
      }
    });
  }

  eliminar(item: Provincia) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '350px',
      data: { mensaje: `¿Está seguro de eliminar "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        if (this.provinciaService.delete(item.id)) {
          this.snackBar.open('Provincia eliminada', 'Cerrar', { duration: 2500 });
          this.cargarProvincias();
        } else {
          this.snackBar.open('Error al eliminar provincia', 'Cerrar', { duration: 2500 });
        }
      }
    });
  }

  toggleEstado(item: Provincia) {
    if (this.provinciaService.toggleEstado(item.id)) {
      this.snackBar.open(
        `Estado cambiado a ${!item.estado ? 'activo' : 'inactivo'}`,
        'Cerrar',
        { duration: 2500 }
      );
      this.cargarProvincias();
    } else {
      this.snackBar.open('Error al cambiar estado', 'Cerrar', { duration: 2500 });
    }
  }
}
