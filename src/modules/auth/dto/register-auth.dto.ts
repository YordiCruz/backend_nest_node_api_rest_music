import { IsBoolean, IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { Login } from "../interfaces/login.interface";


export class RegisterAuthDto implements Login{
   
   // @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    //@ApiProperty()
    @IsEmail()
    email: string;

    @IsBoolean()    
    perfilCompleto: boolean; //   Bandera para controlar si completó persona/cliente

   // @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(200)
    password: string;

}