import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity('multimedia_evento')
export class MultimediaEvento {
  @PrimaryGeneratedColumn('uuid')
  id_multimedia: string;

  @ManyToOne(() => Evento, (evento) => evento.multimedia)
  evento: Evento;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 10 })
  tipo: 'imagen' | 'video';
}
