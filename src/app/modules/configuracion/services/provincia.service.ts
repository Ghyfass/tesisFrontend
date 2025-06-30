// src/app/modules/configuracion/services/provincia.service.ts
import { Injectable } from '@angular/core';
import { BaseDataService } from './data-base.service';
import { Provincia } from '../../../shared/model/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService extends BaseDataService<Provincia> {
  constructor() {
    super();
    // Datos iniciales
    this._data = [
      {
        id: 1,
        nombre: 'Provincia A',
        codigo: '#01',
        fechaModificacion: new Date('2025-06-19T13:00:00'),
        ultimousuario: '#123',
        estado: true,
      },
      {
        id: 2,
        nombre: 'Provincia B',
        codigo: '#02',
        fechaModificacion: new Date('2025-06-18T09:30:00'),
        ultimousuario: '#456',
        estado: false,
      }
    ];
    this.dataSubject.next([...this._data]);
  }

  // Sobrescribimos el método create para agregar los logs
  override create(item: Omit<Provincia, 'id' | 'fechaModificacion'>): Provincia {
    try {
      // Agregamos el usuario que está realizando la creación
      const provinciaWithUser = {
        ...item,
        ultimousuario: '#currentUser' // Deberías reemplazar esto con el usuario real
      };

      const newProvincia = super.create(provinciaWithUser);
      console.log('Provincia creada exitosamente:', newProvincia);
      return newProvincia;
    } catch (error) {
      console.error('Error al crear la provincia:', error);
      throw error; // Re-lanzamos el error para que el componente pueda manejarlo
    }
  }
}
