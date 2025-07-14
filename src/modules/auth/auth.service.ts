import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';
import { JwtService } from '@nestjs/jwt';
import {  RegisterAuthDto } from './dto/register-auth.dto';
import { compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async login(credenciales: LoginAuthDto){
        const { email, password } = credenciales;

        console.log("es : "+ email);
        console.log("es : "+ password);
        

        //buscar el usuario por email
        const usuario = await this.usersService.findOneByEmail(credenciales.email);
        //  lo que devuelve en objeto lo podemos imprimir y poder visualizar los datos
        console.log("usuario:", JSON.stringify(usuario, null, 2));

        

        if (!usuario) {
            console.log(usuario);
            
            throw new HttpException('El usuario no existe', 404);
        }

        //verificar la contraseña
        const verificarPass = await compare(password, usuario.password);
        console.log("poo: " + verificarPass);
        
        if (!verificarPass) {
            return new HttpException('La contraseña es incorrecta', 401);
        }

        // jwt
        const payload = {id: usuario.id, username: usuario.username};
        
        const token = this.jwtService.sign(payload);


        return {acces_token:token, 
           //si queremos retornar todo los datos
            //user: usuario
        //--- o si queremos ciertos datos
            user: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email
            }
        
        };
    }

    
   async register(userObj: RegisterAuthDto ){ {
    // const {password} = userObj;
    // const passHash = await hash(password, 12);
    // userObj = {...userObj, password: passHash};
     return this.usersService.create(userObj);
   }
   }
}
