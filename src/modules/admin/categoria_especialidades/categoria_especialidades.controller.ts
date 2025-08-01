import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaEspecialidadesService } from './categoria_especialidades.service';
import { CreateCategoriaEspecialidadeDto } from './dto/create-categoria_especialidade.dto';
import { UpdateCategoriaEspecialidadeDto } from './dto/update-categoria_especialidade.dto';

@Controller('categoria-especialidades')
export class CategoriaEspecialidadesController {
  constructor(private readonly categoriaEspecialidadesService: CategoriaEspecialidadesService) {}

  @Post()
  create(@Body() createCategoriaEspecialidadeDto: CreateCategoriaEspecialidadeDto) {
    return this.categoriaEspecialidadesService.create(createCategoriaEspecialidadeDto);
  }

  @Get()
  findAll() {
    return this.categoriaEspecialidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaEspecialidadesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaEspecialidadeDto: UpdateCategoriaEspecialidadeDto) {
    return this.categoriaEspecialidadesService.update(id, updateCategoriaEspecialidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaEspecialidadesService.remove(id);
  }
}
