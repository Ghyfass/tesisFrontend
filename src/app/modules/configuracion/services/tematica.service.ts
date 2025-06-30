import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tematica } from '../../../shared/model/tematica.model';

@Injectable({
  providedIn: 'root'
})
export class TematicaService {
  private tematicasSubject = new BehaviorSubject<Tematica[]>([]);
  private tematicas: Tematica[] = [
    {
      id: 1,
      nombre: 'Salud',
      descripcion: 'Temas relacionados con la salud pública',
      fechaModificacion: new Date('2025-06-20T11:00:00'),
      ultimousuario: '#123',
      estado: true,
    },
    {
      id: 2,
      nombre: 'Tecnología',
      descripcion: 'Temas sobre avances tecnológicos',
      fechaModificacion: new Date('2025-06-19T15:30:00'),
      ultimousuario: '#456',
      estado: false,
    }
  ];

  constructor() {
    this.tematicasSubject.next([...this.tematicas]);
  }

  getAll(): Observable<Tematica[]> {
    return this.tematicasSubject.asObservable();
  }

  create(item: Omit<Tematica, 'id'>): Tematica {
    const nuevoId = this.tematicas.length > 0
      ? Math.max(...this.tematicas.map(t => t.id)) + 1
      : 1;

    const nuevaTematica: Tematica = {
      ...item,
      id: nuevoId,
      fechaModificacion: new Date(),
      ultimousuario: '#currentUser'
    };

    this.tematicas.push(nuevaTematica);
    this.tematicasSubject.next([...this.tematicas]);
    return nuevaTematica;
  }

  update(item: Tematica): Tematica | null {
    const index = this.tematicas.findIndex(t => t.id === item.id);
    if (index !== -1) {
      this.tematicas[index] = {
        ...this.tematicas[index],
        ...item,
        fechaModificacion: new Date(),
        ultimousuario: '#currentUser'
      };
      this.tematicasSubject.next([...this.tematicas]);
      return this.tematicas[index];
    }
    return null;
  }

  delete(id: number): boolean {
    const index = this.tematicas.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tematicas.splice(index, 1);
      this.tematicasSubject.next([...this.tematicas]);
      return true;
    }
    return false;
  }

  toggleEstado(id: number): boolean | null {
    const tematica = this.tematicas.find(t => t.id === id);
    if (tematica) {
      tematica.estado = !tematica.estado;
      tematica.fechaModificacion = new Date();
      tematica.ultimousuario = '#currentUser';
      this.tematicasSubject.next([...this.tematicas]);
      return tematica.estado;
    }
    return null;
  }
}
