import { Test, TestingModule } from '@nestjs/testing';
import { MultimediaEventosController } from './multimedia_eventos.controller';
import { MultimediaEventosService } from './multimedia_eventos.service';

describe('MultimediaEventosController', () => {
  let controller: MultimediaEventosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultimediaEventosController],
      providers: [MultimediaEventosService],
    }).compile();

    controller = module.get<MultimediaEventosController>(MultimediaEventosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
