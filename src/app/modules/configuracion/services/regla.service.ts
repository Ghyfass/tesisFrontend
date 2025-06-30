import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseDataService } from './data-base.service';
import { Regla } from '../../../shared/model/regla.model';

@Injectable({
  providedIn: 'root'
})
export class ReglaService extends BaseDataService<Regla> {
  constructor() {
    super();
    // Datos iniciales
    this._data = [
      {
        id: 1,
        nombre: 'Regla HTTP',
        descripcion: 'Bloqueo de puertos HTTP inseguros',
        fechaModificacion: new Date('2025-06-20T10:00:00'),
        ultimousuario: '#123',
        estado: true,
      },
      {
        id: 2,
        nombre: 'Regla HTTPS',
        descripcion: 'Permitir solo conexiones cifradas',
        fechaModificacion: new Date('2025-06-19T09:30:00'),
        ultimousuario: '#456',
        estado: false,
      }
    ];
    this.dataSubject.next([...this._data]);
  }

  // Métodos normales (sincrónicos)
  override create(item: Omit<Regla, 'id' | 'fechaModificacion'>): Regla {
    const reglaWithUser = {
      ...item,
      ultimousuario: this.getCurrentUser()
    };
    return super.create(reglaWithUser);
  }

  // Nuevos métodos Observable
  create$(item: Omit<Regla, 'id' | 'fechaModificacion'>): Observable<Regla> {
    return of(this.create(item));
  }

  update$(item: Regla): Observable<Regla | null> {
    return of(this.update(item));
  }

  delete$(id: number): Observable<boolean> {
    return of(this.delete(id));
  }

  toggleEstado$(id: number): Observable<boolean | null> {
    const result = this.toggleEstado(id);
    return of(result);
  }

  private getCurrentUser(): string {
    return '#currentUser';
  }
}
