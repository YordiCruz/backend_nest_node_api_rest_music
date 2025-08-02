import { Injectable } from '@nestjs/common';
import { CreateMultimediaEventoDto } from './dto/create-multimedia_evento.dto';
import { UpdateMultimediaEventoDto } from './dto/update-multimedia_evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MultimediaEvento } from './entities/multimedia_evento.entity';
import { Repository } from 'typeorm';
import { Evento } from '../eventos/entities/evento.entity';

@Injectable()
export class MultimediaEventosService {
 
    constructor(
    @InjectRepository(MultimediaEvento)
    private readonly repo: Repository<MultimediaEvento>,

    @InjectRepository(Evento)
    private readonly eventoRepo: Repository<Evento>,
  ) {}

  async create(dto: CreateMultimediaEventoDto) {
    const evento = await this.eventoRepo.findOneBy({ id_evento: dto.id_evento });
    if (!evento) throw new Error('Evento no encontrado');

    const multimedia = this.repo.create({
      ...dto,
      evento,
    });

    return this.repo.save(multimedia);
  }

  findAll() {
    return this.repo.find({ relations: ['evento'] });
  }

  findByEvento(id_evento: string) {
    return this.repo.find({ where: { evento: { id_evento } } });
  }

}
