import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDataService<T> {
  protected dataSubject: BehaviorSubject<T[]>;
  protected _data: T[] = [];

  constructor() {
    this.dataSubject = new BehaviorSubject<T[]>(this._data);
  }

  getAll(): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  create(item: Omit<T, 'id' | 'fechaModificacion'>): T {
    const newItem = {
      ...item,
      id: this.generateNewId(),
      fechaModificacion: new Date(),
    } as T;

    this._data = [...this._data, newItem];
    this.dataSubject.next([...this._data]);
    return newItem;
  }

  update(item: T): T | null {
    const index = this._data.findIndex(
      (i) => (i as any).id === (item as any).id
    );
    if (index !== -1) {
      this._data = [
        ...this._data.slice(0, index),
        { ...item, fechaModificacion: new Date() },
        ...this._data.slice(index + 1),
      ];
      this.dataSubject.next([...this._data]);
      return this._data[index];
    }
    return null;
  }

  delete(id: number): boolean {
    const index = this._data.findIndex((i) => (i as any).id === id);
    if (index !== -1) {
      this._data = this._data.filter((item) => (item as any).id !== id);
      this.dataSubject.next([...this._data]);
      return true;
    }
    return false;
  }

  toggleEstado(id: number): boolean | null {
    const index = this._data.findIndex((i) => (i as any).id === id);
    if (index !== -1) {
      this._data = [
        ...this._data.slice(0, index),
        {
          ...this._data[index],
          estado: !(this._data[index] as any).estado,
          fechaModificacion: new Date(),
        },
        ...this._data.slice(index + 1),
      ];
      this.dataSubject.next([...this._data]);
      return (this._data[index] as any).estado;
    }
    return null;
  }

  private generateNewId(): number {
    const ids = this._data.map((i) => (i as any).id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }
}
