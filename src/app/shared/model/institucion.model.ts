export interface Institucion {
  id: number;
  nombre: string;
  idOrganismo: number;
  descripcion: string;
  fechaModificacion: Date;
  ultimousuario: string;
  estado: boolean;
}
