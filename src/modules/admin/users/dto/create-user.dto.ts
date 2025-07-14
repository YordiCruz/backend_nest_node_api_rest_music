import { IsEmail, IsString, Matches, MaxLength, MinLength, Validate, ValidateNested } from "class-validator";
import { Persona } from "../../personas/entities/persona.entity";
import { Type } from "class-transformer";
import { CreatePersonaDto } from "../../personas/dto/create-persona.dto";

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

    @ValidateNested()
    @Type(() => CreatePersonaDto)
    persona?: CreatePersonaDto
}
