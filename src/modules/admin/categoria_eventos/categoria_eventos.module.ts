import { Module } from '@nestjs/common';
import { CategoriaEventosService } from './categoria_eventos.service';
import { CategoriaEventosController } from './categoria_eventos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEvento } from './entities/categoria_evento.entity';
import { EventosModule } from '../eventos/eventos.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaEvento]),
  ],
  controllers: [CategoriaEventosController],
  providers: [CategoriaEventosService],
  exports: [CategoriaEventosService]
})
export class CategoriaEventosModule {}
