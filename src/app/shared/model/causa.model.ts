// src/app/models/causa.model.ts
export interface Causa {
  id: number;
  titulo: string;
  descripcion: string;
  fechaModificacion: Date;
  ultimousuario: string;
  estado: boolean;
}
