import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  async create(@Body() dto: CreateEventoDto, @Req() req) {
    const userId = req.user.id;  // Aquí obtienes el id del usuario autenticado
    return this.eventosService.create({ ...dto, creado_por: userId });
  }

  @Get()
  findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventosService.update(id, updateEventoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(id);
  }
}
