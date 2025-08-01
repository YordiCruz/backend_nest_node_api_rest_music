import { Test, TestingModule } from '@nestjs/testing';
import { IntegranteEspecialidadesController } from './integrante_especialidades.controller';
import { IntegranteEspecialidadesService } from './integrante_especialidades.service';

describe('IntegranteEspecialidadesController', () => {
  let controller: IntegranteEspecialidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntegranteEspecialidadesController],
      providers: [IntegranteEspecialidadesService],
    }).compile();

    controller = module.get<IntegranteEspecialidadesController>(IntegranteEspecialidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
