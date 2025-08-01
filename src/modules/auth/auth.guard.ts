
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log("headers" + request.headers);

     const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log("tipo y token " + type, token);
    
    if(!token){
      throw new UnauthorizedException();
    }

   // type === 
    try {
      //verificar el token si es valido o no
      const payload = await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    
    return true;
  }
}
