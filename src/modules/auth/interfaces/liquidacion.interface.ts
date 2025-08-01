// interfaces/liquidacion.interface.ts
export interface Liquidacion {
  id: string;
  integranteId: string;
  monto: number;
  horas_trabajadas: number;
  fecha: Date;
  observaciones?: string;
  estado?: 'pendiente' | 'pagado';
}
