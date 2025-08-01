import { PartialType } from '@nestjs/mapped-types';
import { CreateIntegranteEspecialidadeDto } from './create-integrante_especialidade.dto';

export class UpdateIntegranteEspecialidadeDto extends PartialType(CreateIntegranteEspecialidadeDto) {}
