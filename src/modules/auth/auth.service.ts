import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtservice: JwtService
    ) {}

    async funLogin(credenciales: LoginAuthDto){
        const { email, password} = credenciales;

        const usuario = await this.userService.findOneByEmail(email);
        if(!usuario) throw new HttpException('El usuario no existe', 404);

        const verfipass = compare(password, usuario.password);

        if(!verfipass) throw new HttpException('Contraseña incorrecta', 404);

        const payload = {id: usuario.id, email: usuario.email, roles: usuario.roles};
        const token = this.jwtservice.sign(payload);

        return {access_token: token, user: usuario};
    }

    funRegister(userObj: RegisterAuthDto){
        const guarda = {
            ...userObj ,
            isActive: false,
            perfilCompleto: false, 
            roleIds: []
        }
        return this.userService.create(guarda);
    }

}
