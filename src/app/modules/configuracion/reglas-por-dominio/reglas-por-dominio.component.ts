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
import { ReglaFormDialogComponent } from './regla-form-dialog/regla-form-dialog.component';
import { ConfirmacionComponent } from '../../../shared/confirmacion/confirmacion.component';
import { ReglaService } from '../services/regla.service';
import { Regla } from '../../../shared/model/regla.model';

@Component({
  selector: 'app-reglas-por-dominio',
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
  templateUrl: './reglas-por-dominio.component.html',
  styleUrls: ['./reglas-por-dominio.component.css']
})
export class ReglasPorDominioComponent implements OnInit {
  filtro = '';
  dataSource: Regla[] = [];
  displayedColumns = ['id', 'nombre', 'descripcion', 'fechaModificacion', 'ultimousuario', 'estado', 'acciones'];
  usuarioActualId = 'user123';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private reglaService: ReglaService
  ) {}

  ngOnInit(): void {
    this.cargarReglas();
  }

  cargarReglas() {
    this.reglaService.getAll().subscribe({
      next: (data) => {
        this.dataSource = [...data];
      },
      error: (err) => console.error('Error al cargar reglas:', err)
    });
  }

  get dataFiltrada() {
    const filtroLower = this.filtro.toLowerCase();
    return this.dataSource.filter(item =>
      item.nombre.toLowerCase().includes(filtroLower) ||
      item.descripcion.toLowerCase().includes(filtroLower) ||
      item.ultimousuario.toLowerCase().includes(filtroLower)
    );
  }

  // ... (imports previos se mantienen igual)

crear() {
  const dialogRef = this.dialog.open(ReglaFormDialogComponent, {
    width: '500px',
    data: {
      modoCreacion: true,
      regla: {
        nombre: '',
        descripcion: '',
        estado: true
      }
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const nuevaRegla: Omit<Regla, 'id' | 'fechaModificacion'> = {
        nombre: result.nombre,
        descripcion: result.descripcion,
        estado: result.estado,
        ultimousuario: this.usuarioActualId
      };

      this.reglaService.create$(nuevaRegla).subscribe({
        next: (nuevaRegla) => {
          this.dataSource = [...this.dataSource, nuevaRegla];
          this.snackBar.open('Regla creada', 'Cerrar', { duration: 2500 });
        },
        error: (err) => {
          console.error('Error al crear regla:', err);
          this.snackBar.open('Error al crear regla', 'Cerrar', { duration: 2500 });
        }
      });
    }
  });
}

editar(item: Regla) {
  const dialogRef = this.dialog.open(ReglaFormDialogComponent, {
    width: '500px',
    data: {
      modoCreacion: false,
      regla: { ...item }
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const reglaActualizada: Regla = {
        ...result,
        ultimousuario: this.usuarioActualId,
        fechaModificacion: new Date()
      };

      this.reglaService.update$(reglaActualizada).subscribe({
        next: (reglaActualizada) => {
          if (reglaActualizada) {
            this.dataSource = this.dataSource.map(r =>
              r.id === reglaActualizada.id ? reglaActualizada : r
            );
            this.snackBar.open('Regla actualizada', 'Cerrar', { duration: 2500 });
          }
        },
        error: (err) => {
          console.error('Error al actualizar regla:', err);
          this.snackBar.open('Error al actualizar regla', 'Cerrar', { duration: 2500 });
        }
      });
    }
  });
}
  eliminar(item: Regla) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '350px',
      data: { mensaje: `¿Está seguro de eliminar la regla "${item.nombre}"?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.reglaService.delete(item.id);
        this.snackBar.open('Regla eliminada', 'Cerrar', { duration: 2500 });
      }
    });
  }

  toggleEstado(item: Regla) {
    const nuevoEstado = this.reglaService.toggleEstado(item.id);
    if (nuevoEstado !== null) {
      this.snackBar.open(
        `Estado cambiado a ${nuevoEstado ? 'activo' : 'inactivo'}`,
        'Cerrar',
        { duration: 2500 }
      );
    }
  }
}
