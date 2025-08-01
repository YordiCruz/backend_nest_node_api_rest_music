import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIntegranteEspecialidadeDto } from './dto/create-integrante_especialidade.dto';
import { UpdateIntegranteEspecialidadeDto } from './dto/update-integrante_especialidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegranteEspecialidades } from './entities/integrante_especialidade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IntegranteEspecialidadesService {
  constructor( 
    @InjectRepository(IntegranteEspecialidades)
    private readonly integranteEspecialidadesRepository: Repository<IntegranteEspecialidades>,  )
    {}
 // Crear una relación nueva
  async create(dto: CreateIntegranteEspecialidadeDto) {
    const existe = await this.integranteEspecialidadesRepository.findOne({
      where: { id_integrante: dto.id_integrante, id_especialidad: dto.id_especialidad },
    });

    if (existe) {
      throw new Error('Ya existe esta relación');
    }

    const relacion = this.integranteEspecialidadesRepository.create(dto);
    return await this.integranteEspecialidadesRepository.save(relacion);
  }

  // Asignar de forma rápida
  async asignarEspecialidad(idIntegrante: string, idEspecialidad: string, nivelDominio: number) {
    const relacion = this.integranteEspecialidadesRepository.create({
      id_integrante: idIntegrante,
      id_especialidad: idEspecialidad,
      nivel_dominio: nivelDominio,
    });
    return await this.integranteEspecialidadesRepository.save(relacion);
  }

  // Obtener todas las relaciones (opcional, solo para admin o pruebas)
  async findAll() {
    return (await this.integranteEspecialidadesRepository.find({
      relations: ['integrante', 'especialidad'],
    }));
  }

  // Obtener todas las especialidades de un integrante
  async findByIntegrante(idIntegrante: string) {
    return await this.integranteEspecialidadesRepository.find({
      where: { id_integrante: idIntegrante },
      relations: ['especialidad'],
    });
  }

  // Obtener una relación específica
  async findOne(id_integrante: string, id_especialidad: string) {
    const relacion = await this.integranteEspecialidadesRepository.findOne({
      where: { id_integrante, id_especialidad },
      relations: ['especialidad', 'integrante'],
    });

    if (!relacion) {
      throw new NotFoundException('Relación no encontrada');
    }

    return relacion;
  }

  // Actualizar una relación
  async update(
    id_integrante: string,
    id_especialidad: string,
    dto: UpdateIntegranteEspecialidadeDto,
  ) {
    const relacion = await this.integranteEspecialidadesRepository.findOne({
      where: { id_integrante, id_especialidad },
    });

    if (!relacion) {
      throw new NotFoundException('Relación no encontrada');
    }

    Object.assign(relacion, dto);
    return await this.integranteEspecialidadesRepository.save(relacion);
  }

  // Eliminar una relación
  async remove(id_integrante: string, id_especialidad: string) {
    const relacion = await this.integranteEspecialidadesRepository.findOne({
      where: { id_integrante, id_especialidad },
    });

    if (!relacion) {
      throw new NotFoundException('Relación no encontrada');
    }

    await this.integranteEspecialidadesRepository.remove(relacion);
    return { message: 'Relación eliminada' };
  }
  
}
