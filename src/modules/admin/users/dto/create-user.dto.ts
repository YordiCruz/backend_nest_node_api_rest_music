import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateIf } from "class-validator";

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

    
  @ValidateIf((o) => o.estado === true)
  @IsArray({ message: 'Debe enviar una lista de roles' })
  roleIds?: string[];
}
