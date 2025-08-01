import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { UpdateIntegranteDto } from './dto/update-integrante.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Integrante } from './entities/integrante.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class IntegrantesService {
  constructor(
    @InjectRepository(Integrante)
    private integrantesRepository: Repository<Integrante>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private usersService: UsersService
  ) {}

async create(createIntegranteDto: CreateIntegranteDto) {
  const { id_usuario, ...restoDatos } = createIntegranteDto;

  // Buscar usuario
  const usuario = await this.usersService.findOne(id_usuario);

  if (!usuario.isActive) {
    throw new BadRequestException('El usuario no está activo');
  }

  // Validar que tenga rol "integrante"
  const tieneRolIntegrante = usuario.roles.some(
    (rol) => rol.nombre === 'integrante',
  );
  if (!tieneRolIntegrante) {
    throw new BadRequestException('El usuario no tiene el rol de integrante');
  }

   // Validar que no tenga ya un integrante asociado
  const yaEsIntegrante = await this.integrantesRepository.findOne({
    where: { user: { id: id_usuario  } },
  });

  if (yaEsIntegrante) {
    throw new ConflictException('Este usuario ya tiene un perfil de integrante');
  }

  const nuevoIntegrante = this.integrantesRepository.create({
    ...restoDatos,
    user: usuario,
  });

  return this.integrantesRepository.save(nuevoIntegrante);
}

  findAll() {
    return this.integrantesRepository.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.integrantesRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: string, updateIntegranteDto: UpdateIntegranteDto) {
    await this.integrantesRepository.update(id, updateIntegranteDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.integrantesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Integrante no encontrado');
    }
    return { message: 'Integrante eliminado correctamente' };
  }
}
