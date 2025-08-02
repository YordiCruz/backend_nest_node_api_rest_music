import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { CategoriaEvento } from '../../categoria_eventos/entities/categoria_evento.entity';
import { MultimediaEvento } from '../../multimedia_eventos/entities/multimedia_evento.entity';
import { User } from '../../users/entities/user.entity';


@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn('uuid')
  id_evento: string;

  @ManyToOne(() => CategoriaEvento, (categoria) => categoria.eventos, { eager: true })
  categoria: CategoriaEvento;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'varchar', default: 'planificado' })
  estado: string;


  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'creado_por' }) // para indicar la columna FK
  creado_por: User;


  @CreateDateColumn()
  creado_en: Date;

  @OneToMany(() => MultimediaEvento, (multimedia) => multimedia.evento, { cascade: true })
  multimedia: MultimediaEvento[];
}
