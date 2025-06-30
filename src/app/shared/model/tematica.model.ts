// src/app/shared/model/tematica.model.ts
export interface Tematica {
  id: number;
  nombre: string;
  descripcion: string;
  fechaModificacion: Date;
  ultimousuario: string;
  estado: boolean;
}
