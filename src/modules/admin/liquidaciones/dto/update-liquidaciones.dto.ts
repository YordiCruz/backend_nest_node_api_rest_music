import { PartialType } from '@nestjs/mapped-types';
import { CreateLiquidacioneDto } from './create-liquidaciones.dto';

export class UpdateLiquidacioneDto extends PartialType(CreateLiquidacioneDto) {}
