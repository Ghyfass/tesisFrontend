// src/app/shared/model/regla.model.ts
export interface Regla {
  id: number;
  nombre: string;
  descripcion: string;
  fechaModificacion: Date;
  ultimousuario: string;
  estado: boolean;
}
