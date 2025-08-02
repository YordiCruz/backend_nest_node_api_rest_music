import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaEventosController } from './categoria_eventos.controller';
import { CategoriaEventosService } from './categoria_eventos.service';

describe('CategoriaEventosController', () => {
  let controller: CategoriaEventosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaEventosController],
      providers: [CategoriaEventosService],
    }).compile();

    controller = module.get<CategoriaEventosController>(CategoriaEventosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
