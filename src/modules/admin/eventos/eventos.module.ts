import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { CategoriaEvento } from '../categoria_eventos/entities/categoria_evento.entity';
import { MultimediaEvento } from '../multimedia_eventos/entities/multimedia_evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, CategoriaEvento, MultimediaEvento]),
],
  controllers: [EventosController],
  providers: [EventosService],
  exports: [EventosService]
})
export class EventosModule {}
