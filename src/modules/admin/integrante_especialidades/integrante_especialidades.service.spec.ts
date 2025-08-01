import { Test, TestingModule } from '@nestjs/testing';
import { IntegranteEspecialidadesService } from './integrante_especialidades.service';

describe('IntegranteEspecialidadesService', () => {
  let service: IntegranteEspecialidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntegranteEspecialidadesService],
    }).compile();

    service = module.get<IntegranteEspecialidadesService>(IntegranteEspecialidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
