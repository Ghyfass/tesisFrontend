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
import { OrganismoFormDialogComponent } from './organismo-form-dialog/organismo-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { OrganismoService } from '../services/organismo.service';
import { Organismo } from '../../../shared/model/organismo.model';

@Component({
  selector: 'app-organismos',
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
  templateUrl: './organismos.component.html',
  styleUrls: ['./organismos.component.css']
})
export class OrganismosComponent implements OnInit {
  filtro = '';
  dataSource: Organismo[] = [];
  displayedColumns = ['id', 'nombre', 'descripcion', 'fechaModificacion', 'ultimousuario', 'estado', 'acciones'];
  usuarioActualId = 'user123';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private organismoService: OrganismoService
  ) {}

  ngOnInit(): void {
    this.cargarOrganismos();
  }

  cargarOrganismos(): void {
    this.organismoService.getAll().subscribe({
      next: (data) => {
        this.dataSource = [...data];
      },
      error: (err) => {
        this.mostrarError('Error al cargar organismos', err);
      }
    });
  }

  get dataFiltrada(): Organismo[] {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      (item.nombre || '').toLowerCase().includes(filtroLower) ||
      (item.descripcion || '').toLowerCase().includes(filtroLower) ||
      (item.ultimousuario || '').toLowerCase().includes(filtroLower)
    );
  }

  crear() {
    const dialogRef = this.dialog.open(OrganismoFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: true,
        organismo: {
          nombre: '',
          descripcion: '',
          estado: true
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.nombre.trim() !== '') {
        try {
          this.organismoService.create({
            ...result,
            ultimousuario: this.usuarioActualId
          });
          this.mostrarExito('Organismo creado exitosamente');
          this.cargarOrganismos();
        } catch (error) {
          this.mostrarError(
            error instanceof Error ? error.message : 'Error al crear organismo',
            error
          );
        }
      }
    });
  }

  editar(item: Organismo) {
    const dialogRef = this.dialog.open(OrganismoFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: false,
        organismo: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.organismoService.update({
            ...result,
            id: item.id,
            ultimousuario: this.usuarioActualId
          });
          this.mostrarExito('Organismo actualizado exitosamente');
          this.cargarOrganismos();
        } catch (error) {
          this.mostrarError(
            error instanceof Error ? error.message : 'Error al actualizar organismo',
            error
          );
        }
      }
    });
  }

  eliminar(item: Organismo) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '350px',
      data: { mensaje: `¿Está seguro de eliminar "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado && item.id) {
        if (this.organismoService.delete(item.id)) {
          this.mostrarExito('Organismo eliminado exitosamente');
          this.cargarOrganismos();
        } else {
          this.mostrarError('Error al eliminar organismo', null);
        }
      }
    });
  }

  toggleEstado(item: Organismo) {
    if (item.id && this.organismoService.toggleEstado(item.id)) {
      this.mostrarExito(`Estado cambiado a ${!item.estado ? 'activo' : 'inactivo'}`);
      this.cargarOrganismos();
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
