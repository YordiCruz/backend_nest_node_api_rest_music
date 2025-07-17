import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePersonaDto {
    @IsString()
    nombres: string;

    @IsString()
    apellidos: string

    @IsString()
    ci_dni: string;

    @IsDateString()
    fecha_nacimiento: Date

    @IsString()
    genero: string

    @IsOptional()
    @IsString()
    telefono?: string

    @IsOptional()
    @IsString()
    direccion?:string


}
