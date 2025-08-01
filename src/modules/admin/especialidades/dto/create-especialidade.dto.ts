import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateEspecialidadeDto {
  @IsUUID()
  @IsNotEmpty({message: 'La categoria es obligatoria '})
  id_categoria: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @Min(0)
  tarifa_base: number;

  @IsOptional()
  @IsNumber()
  @Min(1) // si usas un rango de dificultad
  nivel_dificultad?: number;
}
