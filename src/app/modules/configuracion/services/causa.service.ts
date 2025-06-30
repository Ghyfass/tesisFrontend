// src/app/services/causa.service.ts
import { Injectable } from '@angular/core';
import { BaseDataService } from './data-base.service';
import { Causa } from '../../../shared/model/causa.model';

@Injectable({
  providedIn: 'root'
})
export class CausaService extends BaseDataService<Causa> {
  constructor() {
    super();
    // Datos iniciales simulados
    this._data = [
      {
        id: 1,
        titulo: 'Fallo técnico',
        descripcion: 'Problema con el servidor DNS',
        fechaModificacion: new Date('2025-06-15T11:00:00'),
        ultimousuario: '#123',
        estado: true,
      },
      {
        id: 2,
        titulo: 'Actualización programada',
        descripcion: 'Mantenimiento mensual del sistema',
        fechaModificacion: new Date('2025-06-10T08:45:00'),
        ultimousuario: '#456',
        estado: false,
      }
    ];
    this.dataSubject.next([...this._data]);
  }

  override create(item: Omit<Causa, 'id' | 'fechaModificacion'>): Causa {
    try {
      const causaWithUser = {
        ...item,
        ultimousuario: this.getCurrentUser() // Deberías implementar esta lógica
      };

      const newCausa = super.create(causaWithUser);
      console.log('Causa creada exitosamente:', newCausa);
      return newCausa;
    } catch (error) {
      console.error('Error al crear la causa:', error);
      throw error;
    }
  }

  private getCurrentUser(): string {
    // Implementación temporal - reemplazar con lógica real
    return '#currentUser';
  }
}
