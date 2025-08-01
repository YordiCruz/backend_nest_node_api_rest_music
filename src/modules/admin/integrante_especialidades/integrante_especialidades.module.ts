import { Module } from '@nestjs/common';
import { IntegranteEspecialidadesService } from './integrante_especialidades.service';
import { IntegranteEspecialidadesController } from './integrante_especialidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegranteEspecialidades } from './entities/integrante_especialidade.entity';
import { IntegrantesModule } from '../integrantes/integrantes.module';
import { EspecialidadesModule } from '../especialidades/especialidades.module';

@Module({
  imports: [TypeOrmModule.forFeature([IntegranteEspecialidades]),
  IntegrantesModule,
  EspecialidadesModule

],
  controllers: [IntegranteEspecialidadesController],
  providers: [IntegranteEspecialidadesService],
  exports: [IntegranteEspecialidadesService]
})
export class IntegranteEspecialidadesModule {}
