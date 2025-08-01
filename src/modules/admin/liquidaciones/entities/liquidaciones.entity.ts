import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Integrante } from "../../integrantes/entities/integrante.entity";
import { Liquidacion } from "src/modules/auth/interfaces/liquidacion.interface";

@Entity()
export class Liquidaciones implements Liquidacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;
    
  @Column({ type: 'uuid' })
  integranteId: string;

  @ManyToOne(() => Integrante, (integrante) => integrante.liquidaciones, { eager: true })
  @JoinColumn({ name: 'integrante_id' })
  integrante: Integrante;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column('int')
  horas_trabajadas: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @Column({ default: 'pendiente' })
  estado: 'pendiente' | 'pagado';
}
