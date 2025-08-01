import { IsOptional, IsString } from "class-validator";

export class CreateCategoriaEspecialidadeDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  @IsOptional()
  icono?: string;
}
