import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MultimediaEventosService } from './multimedia_eventos.service';
import { CreateMultimediaEventoDto } from './dto/create-multimedia_evento.dto';
import { UpdateMultimediaEventoDto } from './dto/update-multimedia_evento.dto';

@Controller('multimedia-eventos')
export class MultimediaEventosController {
  constructor(private readonly multimediaEventosService: MultimediaEventosService) {}

  @Post()
  create(@Body() createMultimediaEventoDto: CreateMultimediaEventoDto) {
    return this.multimediaEventosService.create(createMultimediaEventoDto);
  }

  @Get()
  findAll() {
    return this.multimediaEventosService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.multimediaEventosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMultimediaEventoDto: UpdateMultimediaEventoDto) {
  //   return this.multimediaEventosService.update(+id, updateMultimediaEventoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.multimediaEventosService.remove(+id);
  // }
}
