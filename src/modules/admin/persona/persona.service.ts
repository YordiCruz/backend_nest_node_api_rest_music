import { Body, ConflictException, Injectable, NotFoundException, Param, Post } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonaService {

   constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

   ) {}

  create(createPersonaDto: CreatePersonaDto) {
    return 'This action adds a new persona';
  }

  
 // persona.service.ts
async completarPerfil(userId: string, dto: CreatePersonaDto) {
  const user = await this.userRepository.findOneBy({ id: userId });
  
  if (!user) throw new NotFoundException('Usuario no encontrado');
  if (user.perfilCompleto) throw new ConflictException('Perfil ya completado');


  const persona = this.personaRepository.create({ ...dto, user });
  const valid_ci = await this.personaRepository.findOneBy({ci_dni: dto.ci_dni});
  if (valid_ci) throw new ConflictException('CI/DNI ya registrado');
  await this.personaRepository.save(persona);

  user.perfilCompleto = true;
  await this.userRepository.save(user);

  return { success: true };
}

async getPerfilCompleto(userId: string) {
  const user = await this.userRepository.findOne({ 
    where: { id: userId },
    select: ['id', 'email', 'username']  // Solo datos necesarios
  });

  if (!user) throw new NotFoundException('Usuario no encontrado');

  const persona = await this.personaRepository.findOne({
    where: { user: { id: userId } },
  });

  return {
    ...user,
    perfil: persona || null,  // Devuelve null si no tiene perfil
  };
}


  findAll() {
    return this.personaRepository.find();
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personaRepository.findOneBy({id});

    if (!persona) {
      throw new NotFoundException(`El usuario #${id} no encontrado`);
    }
    return persona;
  }


  async updateByUserId(userId: string, updatePersonaDto: UpdatePersonaDto) {
  const persona = await this.personaRepository.findOne({
    where: { user: { id: userId } }, // Relación cargada
  });
  
  if (!persona) {
    throw new NotFoundException(`Perfil para usuario ${userId} no encontrado`);
  }

  Object.assign(persona, updatePersonaDto);
  return this.personaRepository.save(persona);
}


  remove(id: number) {
    return `This action removes a #${id} persona`;
  }
}
