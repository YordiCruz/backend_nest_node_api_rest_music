import { IsInt, IsISO8601, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsUUID()
  @IsNotEmpty()
  id_categoria: string;

  @IsUUID()
  @IsOptional()
  creado_por: string;
}
