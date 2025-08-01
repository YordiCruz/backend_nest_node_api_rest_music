import { Module } from '@nestjs/common';
import { CategoriaEspecialidadesService } from './categoria_especialidades.service';
import { CategoriaEspecialidadesController } from './categoria_especialidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEspecialidade } from './entities/categoria_especialidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaEspecialidade])],
  controllers: [CategoriaEspecialidadesController],
  providers: [CategoriaEspecialidadesService],
  exports: [CategoriaEspecialidadesService],
})
export class CategoriaEspecialidadesModule {}
