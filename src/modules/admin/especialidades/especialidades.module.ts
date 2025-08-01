import { Module } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { EspecialidadesController } from './especialidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from './entities/especialidade.entity';
import { CategoriaEspecialidade } from '../categoria_especialidades/entities/categoria_especialidade.entity';
import { CategoriaEspecialidadesModule } from '../categoria_especialidades/categoria_especialidades.module';

@Module({
  imports: [TypeOrmModule.forFeature([Especialidade]),
  CategoriaEspecialidadesModule
],
  controllers: [EspecialidadesController],
  providers: [EspecialidadesService],
  exports: [EspecialidadesService],
})
export class EspecialidadesModule {}
