import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, Length, Matches } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsDateString()
  fecha_nacimiento: Date;

  @IsString()
  genero: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/^[0-9]+$/, { message: 'El teléfono solo debe contener números' })
  telefono: string;

  @IsString()
  direccion: string;
}
