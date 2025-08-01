import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaEspecialidadesService } from './categoria_especialidades.service';

describe('CategoriaEspecialidadesService', () => {
  let service: CategoriaEspecialidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaEspecialidadesService],
    }).compile();

    service = module.get<CategoriaEspecialidadesService>(CategoriaEspecialidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
