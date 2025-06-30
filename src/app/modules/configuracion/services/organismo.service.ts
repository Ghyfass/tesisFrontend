import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseDataService } from './data-base.service';
import { Organismo } from '../../../shared/model/organismo.model';

@Injectable({
  providedIn: 'root'
})
export class OrganismoService extends BaseDataService<Organismo> {
  constructor() {
    super();
    // Datos iniciales (mantener igual)
    this._data = [
      {
        id: 1,
        nombre: 'Organismo A',
        descripcion: 'Descripción del Organismo A',
        fechaModificacion: new Date('2025-06-20T12:00:00'),
        ultimousuario: '#123',
        estado: true,
      },
      {
        id: 2,
        nombre: 'Organismo B',
        descripcion: 'Descripción del Organismo B',
        fechaModificacion: new Date('2025-06-19T09:30:00'),
        ultimousuario: '#456',
        estado: false,
      }
    ];
    this.dataSubject.next([...this._data]);
  }

  // Métodos que mantienen compatibilidad con BaseDataService
  override create(item: Omit<Organismo, 'id' | 'fechaModificacion'>): Organismo {
    return super.create({
      ...item,
      ultimousuario: this.getCurrentUser()
    });
  }

  override update(item: Organismo): Organismo | null {
    return super.update(item);
  }

  override delete(id: number): boolean {
    return super.delete(id);
  }

  override toggleEstado(id: number): boolean | null {
    return super.toggleEstado(id);
  }

  // Nuevos métodos Observable (para usar en el componente)
  create$(item: Omit<Organismo, 'id' | 'fechaModificacion'>): Observable<Organismo> {
    try {
      const result = this.create(item);
      return of(result);
    } catch (error) {
      throw error;
    }
  }

  update$(item: Organismo): Observable<Organismo | null> {
    const result = this.update(item);
    return of(result);
  }

  delete$(id: number): Observable<boolean> {
    const result = this.delete(id);
    return of(result);
  }

  toggleEstado$(id: number): Observable<boolean | null> {
    const result = this.toggleEstado(id);
    return of(result);
  }

  private getCurrentUser(): string {
    return '#currentUser';
  }
}
