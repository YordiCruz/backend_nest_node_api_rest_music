import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntegrantesService } from './integrantes.service';
import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { UpdateIntegranteDto } from './dto/update-integrante.dto';

@Controller('integrantes')
export class IntegrantesController {
  constructor(private readonly integrantesService: IntegrantesService) {}

  @Post()
  create(@Body() createIntegranteDto: CreateIntegranteDto) {
    return this.integrantesService.create(createIntegranteDto);
  }

  @Get()
  findAll() {
    return this.integrantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.integrantesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntegranteDto: UpdateIntegranteDto) {
    return this.integrantesService.update(id, updateIntegranteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.integrantesService.remove(+id);
  }
}
