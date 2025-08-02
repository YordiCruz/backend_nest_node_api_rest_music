import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './entities/evento.entity';
import { CategoriaEvento } from '../categoria_eventos/entities/categoria_evento.entity';
import { MultimediaEvento } from '../multimedia_eventos/entities/multimedia_evento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento) private eventoRepo: Repository<Evento>,
    @InjectRepository(CategoriaEvento) private categoriaRepo: Repository<CategoriaEvento>,
    @InjectRepository(MultimediaEvento) private multimediaRepo: Repository<MultimediaEvento>,
  ) {}

 async findAll() {
  return await this.eventoRepo.find({
    relations: ['categoria', 'multimedia'],
  });
}

findOne(id: string) {
  return this.eventoRepo.findOne({
    where: { id_evento: id },
    relations: ['categoria', 'multimedia'],
  });
}


   async create(data: CreateEventoDto) {
   const existe = await this.eventoRepo.findOne({
    where: {
      nombre: data.nombre,
    },
  });

  if (existe) {
    throw new BadRequestException('Ya existe un evento con ese nombre');
  }

  // 👇 buscar la categoría
  const categoria = await this.categoriaRepo.findOne({
    where: { id_categoria: data.id_categoria },
  });

  if (!categoria) {
    throw new NotFoundException('La categoría no existe');
  }

  const nuevo = this.eventoRepo.create({
  ...data,
  categoria,
  creado_por: { id: data.creado_por }, // 👈 esto convierte el string a un objeto mínimo esperado
});

  return this.eventoRepo.save(nuevo);
  }


async update(id: string, data: UpdateEventoDto) {
  const evento = await this.eventoRepo.findOneBy({ id_evento: id });
  if (!evento) throw new NotFoundException('Evento no encontrado');

  // Extraer creado_por para tratarlo por separado
  const { creado_por, ...rest } = data;

  const updateData: Partial<Evento> = {
    ...rest,
  };

  if (creado_por) {
    updateData.creado_por = { id: creado_por } as any;
  }

  this.eventoRepo.merge(evento, updateData);
  return this.eventoRepo.save(evento);
}




async remove(id: string) {
  const evento = await this.eventoRepo.findOneBy({ id_evento: id });
  if (!evento) throw new NotFoundException('Evento no encontrado');

  return this.eventoRepo.remove(evento);
}

}
