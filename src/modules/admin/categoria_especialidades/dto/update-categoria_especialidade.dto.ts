import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaEspecialidadeDto } from './create-categoria_especialidade.dto';

export class UpdateCategoriaEspecialidadeDto extends PartialType(CreateCategoriaEspecialidadeDto) {}
