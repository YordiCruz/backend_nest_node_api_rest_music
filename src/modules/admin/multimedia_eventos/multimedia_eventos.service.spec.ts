import { Test, TestingModule } from '@nestjs/testing';
import { MultimediaEventosService } from './multimedia_eventos.service';

describe('MultimediaEventosService', () => {
  let service: MultimediaEventosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultimediaEventosService],
    }).compile();

    service = module.get<MultimediaEventosService>(MultimediaEventosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
