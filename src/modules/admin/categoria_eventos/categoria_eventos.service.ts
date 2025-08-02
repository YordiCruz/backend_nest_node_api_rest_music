import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaEventoDto } from './dto/create-categoria_evento.dto';
import { UpdateCategoriaEventoDto } from './dto/update-categoria_evento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEvento } from './entities/categoria_evento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaEventosService {
   constructor(
    @InjectRepository(CategoriaEvento)
    private readonly repo: Repository<CategoriaEvento>,
  ) {}

  async create(dto: CreateCategoriaEventoDto) {
     const existe = await this.repo.findOneBy({ nombre: dto.nombre });
  if (existe) {
    throw new ConflictException('Ya existe una categoría con ese nombre');
  }

  const nueva = this.repo.create(dto);
  return this.repo.save(nueva);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const categoria = await this.repo.findOne({ where: { id_categoria: id } });
    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }
    return categoria;
  }

  async update(id: string, dto: UpdateCategoriaEventoDto) {
    const categoria = await this.repo.findOne({ where: { id_categoria: id } });
    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    // Verifica si el nuevo nombre ya existe en otra categoría
    if (dto.nombre && dto.nombre !== categoria.nombre) {
      const existe = await this.repo.findOneBy({ nombre: dto.nombre });
      if (existe) {
        throw new ConflictException('Ya existe una categoría con ese nombre');
      }
    }

    this.repo.merge(categoria, dto);
    return this.repo.save(categoria);
  }

  async remove(id: string) {
    const categoria = await this.repo.findOne({ where: { id_categoria: id } });
    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return this.repo.remove(categoria);
  }
}
