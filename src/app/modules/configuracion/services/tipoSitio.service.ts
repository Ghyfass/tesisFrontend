import { Injectable } from '@angular/core';
import { BaseDataService } from './data-base.service';
import { TipoSitio } from '../../../shared/model/tipoSitio.model';

@Injectable({
  providedIn: 'root'
})
export class TipoSitioService extends BaseDataService<TipoSitio> {
  constructor() {
    super();
    // Datos iniciales (igual que en ProvinciaService)
    this._data = [
      {
        id: 1,
        nombre: 'Hospital',
        descripcion: 'Instalaciones médicas',
        fechaModificacion: new Date('2025-06-20T12:00:00'),
        ultimousuario: '#789',
        estado: true,
      },
      {
        id: 2,
        nombre: 'Escuela',
        descripcion: 'Instituciones educativas',
        fechaModificacion: new Date('2025-06-18T09:45:00'),
        ultimousuario: '#321',
        estado: false,
      }
    ];
    this.dataSubject.next([...this._data]);
  }

  // Create con validaciones específicas
  override create(item: Omit<TipoSitio, 'id' | 'fechaModificacion'>): TipoSitio {
    this.validarAntesDeGuardar(item);
    const itemConUsuario = this.agregarMetadata(item);
    return super.create(itemConUsuario);
  }

  // Update con validaciones específicas
  override update(item: TipoSitio): TipoSitio {
    this.validarAntesDeGuardar(item);
    const itemActualizado = {
      ...item,
      fechaModificacion: new Date(),
      ultimousuario: this.getCurrentUser()
    };
    const result = super.update(itemActualizado);
    if (!result) throw new Error('Tipo de sitio no encontrado');
    return result;
  }

  // Métodos privados para lógica compartida
  private validarAntesDeGuardar(item: Partial<TipoSitio>): void {
    if (!item.nombre?.trim()) {
      throw new Error('El nombre es requerido');
    }

    const nombreExistente = this._data.some(t =>
      t.nombre.toLowerCase() === item.nombre!.toLowerCase() &&
      t.id !== item.id
    );

    if (nombreExistente) {
      throw new Error('Ya existe un tipo de sitio con este nombre');
    }
  }

  private agregarMetadata(item: Omit<TipoSitio, 'id' | 'fechaModificacion'>): Omit<TipoSitio, 'id'> {
    return {
      ...item,
      fechaModificacion: new Date(),
      ultimousuario: this.getCurrentUser(),
      estado: item.estado ?? true
    };
  }

  private getCurrentUser(): string {
    // Implementación real iría aquí
    return '#currentUser';
  }
}
