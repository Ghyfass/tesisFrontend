// src/app/services/institucion.service.ts
import { Injectable } from '@angular/core';
import { BaseDataService } from './data-base.service';
import { Institucion } from '../../../shared/model/institucion.model';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService extends BaseDataService<Institucion> {
  constructor() {
    super();
    // Datos iniciales
    this._data = [
      {
        id: 1,
        nombre: 'Instituto Nacional de Salud',
        idOrganismo: 101,
        descripcion: 'Entidad de investigación en salud pública',
        fechaModificacion: new Date('2025-06-16T14:30:00'),
        ultimousuario: '#123',
        estado: true,
      },
      {
        id: 2,
        nombre: 'Universidad de Tecnología',
        idOrganismo: 102,
        descripcion: 'Formación universitaria en áreas tecnológicas',
        fechaModificacion: new Date('2025-06-14T09:10:00'),
        ultimousuario: '#456',
        estado: false,
      }
    ];
    this.dataSubject.next([...this._data]);
  }

  override create(item: Omit<Institucion, 'id' | 'fechaModificacion'>): Institucion {
    try {
      const institucionWithUser = {
        ...item,
        ultimousuario: this.getCurrentUser() // Implementar lógica real
      };

      const newInstitucion = super.create(institucionWithUser);
      console.log('Institución creada exitosamente:', newInstitucion);
      return newInstitucion;
    } catch (error) {
      console.error('Error al crear la institución:', error);
      throw error;
    }
  }

  private getCurrentUser(): string {
    // Implementación temporal - reemplazar con lógica real
    return '#currentUser';
  }
}
