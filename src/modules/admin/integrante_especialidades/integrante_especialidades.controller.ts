import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { IntegranteEspecialidadesService } from './integrante_especialidades.service';
import { CreateIntegranteEspecialidadeDto } from './dto/create-integrante_especialidade.dto';
import { UpdateIntegranteEspecialidadeDto } from './dto/update-integrante_especialidade.dto';

@Controller('integrante-especialidades')
export class IntegranteEspecialidadesController {
  constructor(
    private readonly service: IntegranteEspecialidadesService,
  ) {}

  @Post()
  create(@Body() dto: CreateIntegranteEspecialidadeDto) {
    return this.service.create(dto);
  }

 
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('integrante/:id')
  findByIntegrante(@Param('id') id: string) {
    return this.service.findByIntegrante(id);
  }

  @Get(':id_integrante/:id_especialidad')
  findOne(
    @Param('id_integrante') idIntegrante: string,
    @Param('id_especialidad') idEspecialidad: string,
  ) {
    return this.service.findOne(idIntegrante, idEspecialidad);
  }

  @Patch(':id_integrante/:id_especialidad')
  update(
    @Param('id_integrante') idIntegrante: string,
    @Param('id_especialidad') idEspecialidad: string,
    @Body() dto: UpdateIntegranteEspecialidadeDto,
  ) {
    return this.service.update(idIntegrante, idEspecialidad, dto);
  }

  @Delete(':id_integrante/:id_especialidad')
  remove(
    @Param('id_integrante') idIntegrante: string,
    @Param('id_especialidad') idEspecialidad: string,
  ) {
    return this.service.remove(idIntegrante, idEspecialidad);
  }
}
