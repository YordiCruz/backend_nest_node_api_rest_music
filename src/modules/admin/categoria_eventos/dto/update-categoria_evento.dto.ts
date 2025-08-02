import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaEventoDto } from './create-categoria_evento.dto';

export class UpdateCategoriaEventoDto extends PartialType(CreateCategoriaEventoDto) {}
