import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ConflictException } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService,
    
  ) {}

  @Post()
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

   @Post('completar-perfil/:userId')
  async completarPerfil(
    @Param('userId') userId: string,
    @Body() dto: CreatePersonaDto,
  ) {
    return this.personaService.completarPerfil(userId, dto);
  }
  
  @Get('user/:userId')  // GET /personas/user/:userId
async getPerfilCompleto(@Param('userId') userId: string) {
  return this.personaService.getPerfilCompleto(userId);
}

  @Get()
  findAll() {
    return this.personaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personaService.findOne(+id);
  }

 @Patch('user/:userId')
update(
  @Param('userId') userId: string,
  @Body() updatePersonaDto: UpdatePersonaDto,
) {
  return this.personaService.updateByUserId(userId, updatePersonaDto);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaService.remove(+id);
  }
}
