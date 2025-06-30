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
import { CausaFormDialogComponent } from './causa-form-dialog/causa-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { CausaService } from '../services/causa.service';
import { Causa } from '../../../shared/model/causa.model';

@Component({
  selector: 'app-causas',
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
  templateUrl: './causas.component.html',
  styleUrls: ['./causas.component.css']
})
export class CausasComponent implements OnInit {
  filtro = '';
  dataSource: Causa[] = [];
  displayedColumns = ['id', 'titulo', 'descripcion', 'fechaModificacion', 'ultimousuario', 'estado', 'acciones'];
  usuarioActualId = 'user123';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private causaService: CausaService
  ) {}

  ngOnInit(): void {
    this.cargarCausas();
  }

  cargarCausas(): void {
    this.causaService.getAll().subscribe({
      next: (data) => {
        this.dataSource = [...data];
      },
      error: (err) => {
        this.mostrarError('Error al cargar causas', err);
      }
    });
  }

  get dataFiltrada(): Causa[] {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      (item.titulo || '').toLowerCase().includes(filtroLower) ||
      (item.descripcion || '').toLowerCase().includes(filtroLower) ||
      (item.ultimousuario || '').toLowerCase().includes(filtroLower)
    );
  }

  crear() {
    const dialogRef = this.dialog.open(CausaFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: true,
        causa: {
          titulo: '',
          descripcion: '',
          estado: true
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.titulo.trim() !== '') {
        try {
          this.causaService.create({
            ...result,
            ultimousuario: this.usuarioActualId
          });
          this.mostrarExito('Causa creada exitosamente');
          this.cargarCausas();
        } catch (error) {
          this.mostrarError(
            error instanceof Error ? error.message : 'Error al crear causa',
            error
          );
        }
      }
    });
  }

  editar(item: Causa) {
    const dialogRef = this.dialog.open(CausaFormDialogComponent, {
      width: '450px',
      data: {
        modoCreacion: false,
        causa: { ...item }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.causaService.update({
            ...result,
            id: item.id,
            ultimousuario: this.usuarioActualId
          });
          this.mostrarExito('Causa actualizada exitosamente');
          this.cargarCausas();
        } catch (error) {
          this.mostrarError(
            error instanceof Error ? error.message : 'Error al actualizar causa',
            error
          );
        }
      }
    });
  }

  eliminar(item: Causa) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '350px',
      data: { mensaje: `¿Está seguro de eliminar "${item.titulo}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado && item.id) {
        if (this.causaService.delete(item.id)) {
          this.mostrarExito('Causa eliminada exitosamente');
          this.cargarCausas();
        } else {
          this.mostrarError('Error al eliminar causa', null);
        }
      }
    });
  }

  toggleEstado(item: Causa) {
    if (item.id && this.causaService.toggleEstado(item.id)) {
      this.mostrarExito(`Estado cambiado a ${!item.estado ? 'activo' : 'inactivo'}`);
      this.cargarCausas();
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
