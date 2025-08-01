import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Integrante } from '../../integrantes/entities/integrante.entity';
import { Especialidade } from '../../especialidades/entities/especialidade.entity';

@Entity()
export class IntegranteEspecialidades {
  @PrimaryColumn()
  id_integrante: string;

  @PrimaryColumn()
  id_especialidad: string;

  // Relación con Integrante
  @ManyToOne(() => Integrante, (integrante) => integrante.especialidades)
  @JoinColumn({ name: 'id_integrante' })
  integrante: Integrante;

  // Relación con Especialidade
  @ManyToOne(() => Especialidade, (especialidad) => especialidad.integrantesEspecialidades)
  @JoinColumn({ name: 'id_especialidad' })
  especialidad: Especialidade;

  @Column({ type: 'int', nullable: true })
  nivel_dominio: number;

  @Column({ type: 'int', nullable: true })
  experiencia_meses: number;

  @Column({ type: 'boolean', default: false })
  certificado: boolean;
}