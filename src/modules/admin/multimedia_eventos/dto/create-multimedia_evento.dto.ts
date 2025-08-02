import { IsString, IsUUID } from "class-validator";

export class CreateMultimediaEventoDto {
  @IsUUID()
  @IsString()
  id_evento: string;
  
  @IsString()
  url: string;

  @IsString()
  tipo: 'imagen' | 'video';

  @IsString()
  descripcion?: string;
}
