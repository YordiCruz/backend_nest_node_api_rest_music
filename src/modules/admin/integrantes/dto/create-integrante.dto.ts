import { IsDecimal, IsDateString, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateIntegranteDto {
  @IsString()
  id_usuario: string; // Clave foránea, necesaria

  @IsDecimal()
  tarifa_base_hora: number;

  @IsDateString()
  fecha_ingreso: string; // o Date si prefieres, pero con string es más flexible en JSON

  @IsBoolean()
  estado: boolean;
}
