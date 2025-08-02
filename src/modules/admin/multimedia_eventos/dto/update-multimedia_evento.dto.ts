import { PartialType } from '@nestjs/mapped-types';
import { CreateMultimediaEventoDto } from './create-multimedia_evento.dto';

export class UpdateMultimediaEventoDto extends PartialType(CreateMultimediaEventoDto) {}
