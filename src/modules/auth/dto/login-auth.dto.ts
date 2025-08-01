import { IsEmail, IsNotEmpty, Max, MaxLength, Min, MinLength } from "class-validator";
import { Login } from "../interfaces/login.interface";

export class LoginAuthDto implements Login {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(250)
    password: string;
}