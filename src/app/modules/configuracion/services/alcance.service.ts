// src/app/services/alcance.service.ts
import { Injectable } from '@angular/core';
import { BaseDataService } from './data-base.service';
import { Alcance } from '../../../shared/model/alcance.model';

@Injectable({
  providedIn: 'root'
})
export class AlcanceService extends BaseDataService<Alcance> {
  constructor() {
    super();
    // Datos iniciales
    this._data = [
      {
        id: 1,
        nombre: 'Alcance 1',
        fechaModificacion: new Date('2025-06-18T15:30:00'),
        usuarioModificacion: '#123',
        estado: true,
      },
      {
        id: 2,
        nombre: 'Alcance 2',
        fechaModificacion: new Date('2025-06-17T10:20:00'),
        usuarioModificacion: '#456',
        estado: false,
      }
    ];
    this.dataSubject.next([...this._data]);
  }

  override create(item: Omit<Alcance, 'id' | 'fechaModificacion'>): Alcance {
    try {
      const alcanceWithUser = {
        ...item,
        usuarioModificacion: this.getCurrentUser() // Método para obtener usuario actual
      };

      const newAlcance = super.create(alcanceWithUser);
      console.log('Alcance creado exitosamente:', newAlcance);
      return newAlcance;
    } catch (error) {
      console.error('Error al crear el alcance:', error);
      throw error;
    }
  }

  private getCurrentUser(): string {
    // Implementación real para obtener el usuario actual
    // Ejemplo: return this.authService.currentUser.id;
    return '#currentUser'; // Valor temporal para demostración
  }
}
