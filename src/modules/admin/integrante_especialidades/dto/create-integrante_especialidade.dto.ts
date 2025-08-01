import { IsInt, IsOptional, IsUUID, Max, Min } from "class-validator";

export class CreateIntegranteEspecialidadeDto {
    
    @IsUUID()
    id_integrante: string;
    
    @IsUUID()
    id_especialidad: string;
    
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    nivel_dominio?: number;
    
    experiencia_meses?: number;
    certificado?: boolean;
}
