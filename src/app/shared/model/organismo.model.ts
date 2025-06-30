// src/app/shared/model/organismo.model.ts
export interface Organismo {
  id: number;
  nombre: string;
  descripcion: string;
  fechaModificacion: Date;
  ultimousuario: string;
  estado: boolean;
}
