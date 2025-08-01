import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaEspecialidadesController } from './categoria_especialidades.controller';
import { CategoriaEspecialidadesService } from './categoria_especialidades.service';

describe('CategoriaEspecialidadesController', () => {
  let controller: CategoriaEspecialidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaEspecialidadesController],
      providers: [CategoriaEspecialidadesService],
    }).compile();

    controller = module.get<CategoriaEspecialidadesController>(CategoriaEspecialidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
