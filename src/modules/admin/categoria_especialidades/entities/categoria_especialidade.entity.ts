import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Especialidade } from "../../especialidades/entities/especialidade.entity";

@Entity()
export class CategoriaEspecialidade {

  @PrimaryGeneratedColumn('uuid')
  id_categoria: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icono: string;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;

  @OneToMany(() => Especialidade, (especialidad) => especialidad.categoria)
  especialidades: Especialidade[];

}
