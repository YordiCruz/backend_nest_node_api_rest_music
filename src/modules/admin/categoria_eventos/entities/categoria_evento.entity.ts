import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity()
export class CategoriaEvento {
  @PrimaryGeneratedColumn('uuid')
  id_categoria: string;

  @Column({ type: 'varchar', length: 100, unique: true})
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Evento, (evento) => evento.categoria)
  eventos: Evento[];
}
