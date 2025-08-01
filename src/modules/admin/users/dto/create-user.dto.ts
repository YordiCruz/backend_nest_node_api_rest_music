import { ArrayMinSize, IsArray, IsBoolean, IsEmail, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength, ValidateIf } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @Matches('[a-z0-9\-]+')
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(200)
    password: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean

    @IsBoolean()
    perfilCompleto?: boolean
    
  
  @ValidateIf(o => o.isActive === true)
  @ArrayMinSize(1, { message: 'Debe asignar al menos un rol' })
  @IsUUID('4', { each: true, message: 'Cada ID de rol debe ser un UUID válido' })
  roleIds?: string[];
}
