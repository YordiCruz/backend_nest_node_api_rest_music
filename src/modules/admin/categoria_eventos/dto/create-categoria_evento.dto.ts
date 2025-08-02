import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaEventoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  descripcion?: string;

}
