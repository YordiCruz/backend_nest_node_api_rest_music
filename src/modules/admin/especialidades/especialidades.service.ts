import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';
import { UpdateEspecialidadeDto } from './dto/update-especialidade.dto';
import { Especialidade } from './entities/especialidade.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEspecialidadesService } from '../categoria_especialidades/categoria_especialidades.service';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidade)
    private readonly especialidadRepo: Repository<Especialidade>,
    private readonly categoriaService: CategoriaEspecialidadesService
  ) {
    
  }
  async create(createEspecialidadeDto: CreateEspecialidadeDto) {

     const categoria = await this.categoriaService.findOne(createEspecialidadeDto.id_categoria);
    const especialidad = this.especialidadRepo.create({
      ...createEspecialidadeDto,
      categoria,
    });
    return await this.especialidadRepo.save(especialidad);

  }

  async findAll() {

   return (await this.especialidadRepo.find({ relations: ['categoria'] }))
  .map(({ categoria, ...rest }) => ({
    ...rest,
    categoria,
  }));

  }

  async findOne(id: string) {

     const especialidad = await this.especialidadRepo.findOne({
      where: { id_especialidad: id },
      relations: ['categoria'],
    })
    if (!especialidad) throw new NotFoundException('Especialidad no encontrada');

     // Reordenar para que `categoria` aparezca al final
  const { categoria, ...rest } = especialidad;
  return {
    ...rest,
    categoria,
  };
    
  }

  async update(id: string, updateEspecialidadeDto: UpdateEspecialidadeDto) {

        const especialidad = await this.especialidadRepo.preload({
      id_especialidad: id,
      ...updateEspecialidadeDto,
    });
    if (!especialidad) throw new NotFoundException('Especialidad no encontrada');
    if (updateEspecialidadeDto.id_categoria) {
      especialidad.categoria = await this.categoriaService.findOne(updateEspecialidadeDto.id_categoria);
    }
    return await this.especialidadRepo.save(especialidad);

  }

  async remove(id: string) {
    const especialidad = await this.findOne(id);
    await this.especialidadRepo.remove(especialidad);
    return { message: 'Especialidad eliminada' };
  
  }
}
