import { Module } from '@nestjs/common';
import { MultimediaEventosService } from './multimedia_eventos.service';
import { MultimediaEventosController } from './multimedia_eventos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MultimediaEvento } from './entities/multimedia_evento.entity';
import { Evento } from '../eventos/entities/evento.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MultimediaEvento, Evento])],
  controllers: [MultimediaEventosController],
  providers: [MultimediaEventosService],
  exports: [MultimediaEventosService]
})
export class MultimediaEventosModule {}
