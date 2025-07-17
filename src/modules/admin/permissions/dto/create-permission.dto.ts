import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePermissionDto {
    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;
    
    @IsString()
    subject: string;

    @IsString()
    action: string;

}
