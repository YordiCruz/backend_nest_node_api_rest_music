import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaEspecialidade } from "../../categoria_especialidades/entities/categoria_especialidade.entity";
import { Integrante } from "../../integrantes/entities/integrante.entity";
import { IntegranteEspecialidades } from "../../integrante_especialidades/entities/integrante_especialidade.entity";

@Entity()
export class Especialidade {
  
  @PrimaryGeneratedColumn('uuid')
  id_especialidad: string;

  @ManyToOne(() => CategoriaEspecialidade, (categoria) => categoria.especialidades)
  @JoinColumn({ name: 'id_categoria' })
  categoria: CategoriaEspecialidade;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  tarifa_base: number;

  @Column({ type: 'int', nullable: true })
  nivel_dificultad: number;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

   @OneToMany(() => IntegranteEspecialidades, (ie) => ie.especialidad)
  integrantesEspecialidades: IntegranteEspecialidades[];

}
