import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaEspecialidadeDto } from './dto/create-categoria_especialidade.dto';
import { UpdateCategoriaEspecialidadeDto } from './dto/update-categoria_especialidade.dto';
import { CategoriaEspecialidade } from './entities/categoria_especialidade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriaEspecialidadesService {
  constructor(
    @InjectRepository(CategoriaEspecialidade)
    private readonly categoriaRepo: Repository<CategoriaEspecialidade>,
  ){}
  async create(createCategoriaEspecialidadeDto: CreateCategoriaEspecialidadeDto) {
    const categoria = this.categoriaRepo.create(createCategoriaEspecialidadeDto);
    return await this.categoriaRepo.save(categoria);
  }

  findAll() {
    return this.categoriaRepo.find(
      {
        relations: ['especialidades'],
      }
    );
  }

  async findOne(id: string) {
     const categoria = await this.categoriaRepo.findOne({
      where:  { id_categoria: id },
      relations: ['especialidades'],
    });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;

  }

  async update(id: string, updateCategoriaEspecialidadeDto: UpdateCategoriaEspecialidadeDto) {
    const categoria = await this.categoriaRepo.preload({
      id_categoria: id,
      ...updateCategoriaEspecialidadeDto,
    });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return await this.categoriaRepo.save(categoria);
  }

  async remove(id: string) {
     const categoria = await this.findOne(id);
    await this.categoriaRepo.remove(categoria);
    return { message: 'Categoría eliminada' };
  }
}
